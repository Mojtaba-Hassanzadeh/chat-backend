import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { SearchImagesInput, SearchImagesOutput } from '../dto/search-image.dto';
import { ImageEntityFactory } from '../entity/image.factory';
import { SearchImageQuery } from '../query/search-image/search-image.query';
import { DEFAULT_COUNT } from 'common/constants/pagination.constant';

@Injectable()
export class SearchImageUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly imageEntityFactory: ImageEntityFactory,
  ) {}
  async searchImage(
    searchImagesInput: SearchImagesInput,
  ): Promise<SearchImagesOutput> {
    try {
      const imageList = await this.queryBus.execute(
        new SearchImageQuery(searchImagesInput),
      );
      if (!imageList.length) {
        throw new NotFoundException('IMAGE_NOT_FOUND');
      }
      const imageEntityList = imageList.map((image) =>
        this.imageEntityFactory.createFromModel(image),
      );
      return {
        success: true,
        results: imageEntityList,
        totalCount: imageList.length,
        totalPages: Math.ceil(
          imageList.length / (searchImagesInput.count || DEFAULT_COUNT),
        ),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
