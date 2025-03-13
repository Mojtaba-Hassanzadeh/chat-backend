import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import * as path from 'path';
import sharp from 'sharp';

import { ImageEntityFactory } from '../entity/image.factory';
import { ImageHelper } from '../helper/image.helper';
import {
  UploadImageOutput,
  UploadImageWithUrlInput,
} from '../dto/upload-image.dto';
import { CreateImageCommand } from '../command/create-image/create-image.command';
import { createdImageDirectory } from 'common/utils/directories.util';
import { ImageModel } from '../model/image.model';

@Injectable()
export class UploadImageWithUrlUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly imageHelper: ImageHelper,
    private readonly httpService: HttpService,
    private readonly factory: ImageEntityFactory,
  ) {}

  async execute({
    url,
    alt,
  }: UploadImageWithUrlInput): Promise<UploadImageOutput> {
    try {
      const maxSizeWebPSupported = 16383;
      const response = await this.httpService.axiosRef(url, {
        responseType: 'stream',
      });

      const stream = response.data;
      const sharpPipe = sharp({ failOnError: false });
      stream.pipe(sharpPipe);
      const metadata = await sharpPipe.metadata();
      const preview = await this.imageHelper.getPreviewOfImage({
        sharpPipe,
        metadata,
      });
      const filename = path.parse(url.substring(url.lastIndexOf('/') + 1)).name;

      const width =
        metadata.width && metadata.width > maxSizeWebPSupported
          ? maxSizeWebPSupported
          : metadata.width;

      const height =
        metadata.height && metadata.height > maxSizeWebPSupported
          ? maxSizeWebPSupported
          : metadata.height;

      const imageModel: ImageModel = await this.commandBus.execute(
        new CreateImageCommand({ filename, width, height, preview, alt }),
      );

      const imageId: string = imageModel.getId();

      if (imageModel) {
        const directory = createdImageDirectory(imageId);
        await sharpPipe
          .resize(width, height, {
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
