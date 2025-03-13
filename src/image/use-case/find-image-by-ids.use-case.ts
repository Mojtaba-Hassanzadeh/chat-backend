import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ImageEntityFactory } from '../entity/image.factory';
import { ImageEntity } from '../entity/image.entity';
import { ImageModel } from '../model/image.model';
import { FindImageByIdsQuery } from '../query/find-image-by-ids/find-image-by-ids.query';

@Injectable()
export class FindImageByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly imageEntityFactory: ImageEntityFactory,
  ) {}

  async findImageByIds(idList: string[]): Promise<ImageEntity[] | null> {
    try {
      const images: ImageModel[] = await this.queryBus.execute(
        new FindImageByIdsQuery(idList),
      );
      const imageEntityList = images.map((img) =>
        this.imageEntityFactory.createFromModel(img),
      );
      return imageEntityList;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
