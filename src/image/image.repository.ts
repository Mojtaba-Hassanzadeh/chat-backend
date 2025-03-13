import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { ImageEntity, TImage } from './entity/image.entity';
import { ImageEntityFactory } from './entity/image.factory';
import { BaseRepository } from 'common/repositories/base-repository';
import { ImageModel } from './model/image.model';
import { SearchImagesInput } from './dto/search-image.dto';
import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from 'common/constants/pagination.constant';
import { escapeRegex } from 'common/utils/escape-regx.util';
import { CreateImageInput } from './dto/create-image.dto';

@Injectable()
export class ImageRepository extends BaseRepository<
  ImageEntity,
  ImageModel,
  string
> {
  constructor(
    @InjectModel(ImageEntity.name)
    protected readonly imageModel: Model<TImage>,
    protected readonly imageEntityFactory: ImageEntityFactory,
  ) {
    super(imageModel, imageEntityFactory);
  }

  async insertMany(images: CreateImageInput[]): Promise<ImageEntity[]> {
    const result = await this.imageModel.insertMany(images);
    return result.map((doc) => new this.imageModel(doc));
  }

  async updateImage(imageInput: ImageModel): Promise<void> {
    const imageEntity = this.imageEntityFactory.create(imageInput);
    await this.imageModel
      .findOneAndReplace({ _id: imageInput.getId() }, imageEntity)
      .exec();
  }

  async search({
    count: inputCount,
    page: inputPage,
    filename,
  }: SearchImagesInput): Promise<ImageModel[]> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;
    const safeFilename = filename ? escapeRegex(filename) : filename;
    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...(filename && {
            $or: [
              { $text: { $search: filename } },
              { filename: { $regex: safeFilename, $options: 'i' } },
            ],
          }),
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      { $skip: (page - 1) * count },
      { $limit: count },
    ];

    const pipelinec: PipelineStage[] = [
      {
        $match: {
          ...(filename && {
            $or: [
              { $text: { $search: filename } },
              { filename: { $regex: safeFilename, $options: 'i' } },
            ],
          }),
        },
      },
      { $count: 'count' },
    ];
    const [results, totalCountResult] = await Promise.all([
      this.imageModel.aggregate(pipeline), // Execute results pipeline
      this.imageModel.aggregate(pipelinec), // Execute total count pipeline
    ]);
    const imageResult = results?.map((ie) =>
      this.imageEntityFactory.createFromEntity(ie),
    );
    return imageResult;
  }
}
