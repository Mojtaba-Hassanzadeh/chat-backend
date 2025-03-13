import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindImageByIdQuery } from './find-image-by-id.query';
import { ImageRepository } from 'src/image/image.repository';
import { ImageModel } from 'src/image/model/image.model';

@QueryHandler(FindImageByIdQuery)
export class FindImageByIdHandler implements IQueryHandler<FindImageByIdQuery> {
  constructor(private readonly imageRepository: ImageRepository) {}
  async execute({ id }: FindImageByIdQuery): Promise<ImageModel | null> {
    return this.imageRepository.findById(id);
  }
}
