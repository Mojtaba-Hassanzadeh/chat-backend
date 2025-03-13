import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ImageEntityFactory } from '../entity/image.factory';
import { ImageModel } from '../model/image.model';
import { FindImageByIdQuery } from '../query/find-image-by-id/find-image-by-id.query';
import { FindImageOutput } from '../dto/find-image.dto';

@Injectable()
export class FindImageByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly imageEntityFactory: ImageEntityFactory,
  ) {}

  async findImageById(id: string): Promise<FindImageOutput> {
    try {
      const image: ImageModel = await this.queryBus.execute(
        new FindImageByIdQuery(id),
      );
      if (!image) throw new NotFoundException('image not found');

      const finalResult = this.imageEntityFactory.createFromModel(image);

      return {
        success: true,
        result: finalResult,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
