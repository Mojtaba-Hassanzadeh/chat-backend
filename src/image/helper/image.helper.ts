import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { createdImageDirectory } from 'common/utils/directories.util';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { ImageModel } from '../model/image.model';
import { getBase64ImageSize, getBase64String } from 'common/utils/base64.util';
import { FileUpload } from 'graphql-upload-minimal';
import { ImageRepository } from '../image.repository';

@Injectable()
export class ImageHelper {
  constructor(private readonly imageRepository: ImageRepository) {}
  async validateImageFileType(file: FileUpload) {
    try {
      if (!file.mimetype) {
        throw new BadRequestException();
      }
      if (!file.mimetype.includes('image')) {
        throw new BadRequestException();
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getValidatedImageFiles(
    imageFiles: Promise<FileUpload>[],
  ): Promise<FileUpload[]> {
    try {
      const files: FileUpload[] = await Promise.all(imageFiles);
      files.map((file) => {
        if (!file.mimetype || !file.mimetype.includes('image'))
          throw new BadRequestException();
      });
      return files;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPreviewOfImage(input: {
    sharpPipe: sharp.Sharp;
    metadata: sharp.Metadata;
  }): Promise<string> {
    try {
      const { sharpPipe, metadata } = input;
      const previewImageSize = getBase64ImageSize(metadata);
      const base64ImageBuffer = await sharpPipe
        .resize(previewImageSize.width, previewImageSize.height)
        .toBuffer();
      return getBase64String({ metadata, buffer: base64ImageBuffer });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateImageId(id: string): Promise<ImageModel> {
    try {
      const image = await this.imageRepository.findById(id);
      if (!image || image === null) {
        throw new BadRequestException('IMAGE_NOT_FOUND');
      }
      return image;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteImageFromLocal(id: string) {
    try {
      const directory = createdImageDirectory(id);
      fs.rmSync(directory, { recursive: true, force: true });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
