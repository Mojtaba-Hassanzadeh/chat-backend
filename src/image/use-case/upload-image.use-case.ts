import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { createdImageDirectory } from 'common/utils/directories.util';
import * as path from 'path';
import sharp from 'sharp';
import { CreateImageInput } from '../dto/create-image.dto';
import { UploadImageInput, UploadImageOutput } from '../dto/upload-image.dto';
import { ImageHelper } from '../helper/image.helper';
import { ImageModel } from '../model/image.model';
import { CreateImageCommand } from '../command/create-image/create-image.command';
import { ImageEntityFactory } from '../entity/image.factory';

@Injectable()
export class UploadImageUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly imageHelper: ImageHelper,
    private readonly factory: ImageEntityFactory,
  ) {}

  async uploadImage(
    uploadImageInput: UploadImageInput,
  ): Promise<UploadImageOutput> {
    try {
      const { imageFile, alt } = uploadImageInput;
      await this.imageHelper.validateImageFileType(imageFile);

      // add to database
      const stream = imageFile.createReadStream();
      const sharpPipe = sharp();
      stream.pipe(sharpPipe);
      const metadata = await sharpPipe.metadata();
      const preview = await this.imageHelper.getPreviewOfImage({
        sharpPipe,
        metadata,
      });

      const createImageInput: CreateImageInput = {
        alt,
        filename: path.parse(imageFile.filename).name,
        width: metadata.width,
        height: metadata.height,
        preview,
      };

      const uploadedImage = await this.commandBus.execute(
        new CreateImageCommand(createImageInput),
      );

      const imageModel: ImageModel = uploadedImage;
      const imageId = imageModel.getId();
      if (uploadedImage) {
        // add to directory
        const directory = createdImageDirectory(imageId);
        await sharpPipe
          .resize(metadata.width, metadata.height, {
            fit: 'cover',
          })
          .toFormat('webp', { lossless: false })
          .toFile(`${directory}/${imageId}.webp`);
      }
      const image = this.factory.createFromModel(imageModel);

      return { success: true, image };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
