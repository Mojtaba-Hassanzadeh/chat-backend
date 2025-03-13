import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ImageRepository } from 'src/image/image.repository';
import { ImageModel } from 'src/image/model/image.model';
import { SearchImageQuery } from './search-image.query';

@QueryHandler(SearchImageQuery)
export class SearchImageHandler implements IQueryHandler<SearchImageQuery> {
  constructor(private readonly imageRepository: ImageRepository) {}
  async execute({ data }: SearchImageQuery): Promise<ImageModel[] | null> {
    return this.imageRepository.search(data);
  }
}
