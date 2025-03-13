import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ImageRepository } from 'src/image/image.repository';
import { ImageModel } from 'src/image/model/image.model';
import { FindImageByIdsQuery } from './find-image-by-ids.query';

@QueryHandler(FindImageByIdsQuery)
export class FindImageByIdsHandler
  implements IQueryHandler<FindImageByIdsQuery>
{
  constructor(private readonly imageRepository: ImageRepository) {}
  async execute({ idList }: FindImageByIdsQuery): Promise<ImageModel[] | null> {
    return this.imageRepository.findManyByIds(idList);
  }
}
