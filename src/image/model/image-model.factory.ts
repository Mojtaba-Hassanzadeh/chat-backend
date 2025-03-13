import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ImageRepository } from '../image.repository';
import { ModelFactory } from 'common/repositories/model.factory';
import { CreateImageInput } from '../dto/create-image.dto';
import { ImageModel } from './image.model';

@Injectable()
export class ImageModelFactory implements ModelFactory<ImageModel> {
  constructor(private readonly imageRepository: ImageRepository) {}

  async create(input: CreateImageInput): Promise<ImageModel> {
    const { alt, filename, width, height, preview } = input;
    const newImage = new ImageModel({
      _id: new ObjectId().toHexString(),
      alt,
      filename,
      width,
      height,
      preview,
    });

    await this.imageRepository.create(newImage);
    return newImage;
  }
}
