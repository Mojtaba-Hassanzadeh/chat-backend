import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import * as path from 'path';
import sharp from 'sharp';
import { ImageHelper } from '../helper/image.helper';
import { ImageEntityFactory } from '../entity/image.factory';
import { UploadImagesInput, UploadImagesOutput } from '../dto/upload-image.dto';
import { CreateImageInput } from '../dto/create-image.dto';
import { ImageEntity } from '../entity/image.entity';
import { InsertManyImagesCommand } from '../command/insert-many-images/insert-many-images.command';
import { createdImageDirectory } from 'common/utils/directories.util';

@Injectable()
export class UploadImagesUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly imageHelper: ImageHelper,
    private readonly factory: ImageEntityFactory,
  ) {}

  async uploadImages(
    uploadImageInput: UploadImagesInput,
  ): Promise<UploadImagesOutput> {
    try {
      const { imageFiles: inputImageFiles } = uploadImageInput;
      const imageFiles =
        await this.imageHelper.getValidatedImageFiles(inputImageFiles);

      const createImageInputs: CreateImageInput[] = [];
      const imageDirectories: {
        id: string;
        sharpPipe: sharp.Sharp;
        metadata: sharp.Metadata;
      }[] = [];

      // Process each image
      await Promise.all(
        imageFiles.map(async (imageFile) => {
          const stream = imageFile.createReadStream();
          const sharpPipe = sharp();
          stream.pipe(sharpPipe);

          const metadata = await sharpPipe.metadata();
          const preview = await this.imageHelper.getPreviewOfImage({
            sharpPipe,
            metadata,
          });

          const createImageInput: CreateImageInput = {
            filename: path.parse(imageFile.filename).name,
            width: metadata.width,
            height: metadata.height,
            preview,
          };

          createImageInputs.push(createImageInput);
          // Save sharpPipe and metadata for resizing after image is created
          imageDirectories.push({ id: null, sharpPipe, metadata });
        }),
      );

      // Insert all images in one go
      const uploadedImages: ImageEntity[] = await this.commandBus.execute(
        new InsertManyImagesCommand(createImageInputs),
      ); // Adapt for batch processing
      const imageModels = uploadedImages.map((uploadedImage) =>
        this.factory.createFromEntity(uploadedImage),
      );

      // Generate directory and save files
      await Promise.all(
        imageModels.map((imageModel, index) => {
          const imageId = imageModel.getId();
          const { sharpPipe, metadata } = imageDirectories[index];

          const directory = createdImageDirectory(imageId);
          return sharpPipe
            .resize(metadata.width, metadata.height, { fit: 'cover' })
            .toFormat('webp', { lossless: false })
            .toFile(`${directory}/${imageId}.webp`);
        }),
      );

      const images = imageModels.map((imageModel) =>
        this.factory.createFromModel(imageModel),
      );

      return { success: true, images };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
