import { Injectable } from '@nestjs/common';
import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from 'common/constants/pagination.constant';
import { PaginationInput } from 'common/dtos/pagination.dto';
import { SearchData } from 'common/interfaces/search.data.interface';
import { projection } from 'common/utils/project-stage';
import { UpdateOptions } from 'mongodb';
import { ClientSession, Model, PipelineStage, QueryOptions } from 'mongoose';

@Injectable()
export abstract class BaseRepository<T, M, IDType = string | number> {
  protected constructor(
    protected readonly model: Model<any>,
    protected readonly entityFactory: {
      createFromModel(model: M): T;
      createFromEntity(entity: T): M;
    },
  ) {}

  async findById(id: IDType, fields?: string[]): Promise<M | null> {
    const entity = (await this.model
      .findById(id, projection(fields))
      .lean()
      .exec()) as T;
    return this.entityFactory.createFromEntity(entity);
  }

  async findOne(
    filter: any = {},
    fields?: string[],
    options: QueryOptions = null,
  ): Promise<M | null> {
    const query = this.model
      .findOne(filter, projection(fields), options)
      .lean();

    if (options?.sort) {
      query.sort(options.sort);
    }

    const entity = (await query.exec()) as T;
    return this.entityFactory.createFromEntity(entity);
  }

  async findManyByIds(ids: IDType[], fields?: string[]): Promise<M[]> {
    const entities = (await this.model
      .find({ _id: { $in: ids } }, projection(fields))
      .lean()
      .exec()) as T[];
    return entities.map(
      this.entityFactory.createFromEntity.bind(this.entityFactory),
    );
  }

  async findMany(
    filter: any = {},
    fields: string[],
    options: QueryOptions = null,
  ): Promise<M[]> {
    const query = this.model.find(filter, projection(fields), options).lean();

    if (options?.limit) {
      query.limit(options.limit);
    }

    if (options?.sort) {
      query.sort(options.sort);
    }

    const entities = (await query.exec()) as T[];

    return entities.map(
      this.entityFactory.createFromEntity.bind(this.entityFactory),
    );
  }

  async getAll({
    count = DEFAULT_COUNT,
    page = DEFAULT_PAGE,
    match,
  }: PaginationInput): Promise<SearchData<T>> {
    const pipeline: PipelineStage[] = [
      ...(match && Object.keys(match).length > 0 ? [{ $match: match }] : []),
      {
        $facet: {
          results: [{ $skip: (page - 1) * count }, { $limit: count }],
          totalCount: [{ $count: 'count' }],
        },
      },
    ];
    const [searchData = {}] = await this.model.aggregate(pipeline).exec();
    return {
      results: searchData.results,
      totalCount: searchData.totalCount?.[0]?.count,
    };
  }

  async create(model: M, options?: { session?: ClientSession }): Promise<void> {
    const entity = new this.model(this.entityFactory.createFromModel(model));
    await entity.save({ session: options?.session });
  }

  async update(
    id: IDType,
    updateInput: any,
    options?: { session?: ClientSession },
  ): Promise<void> {
    await this.model
      .findByIdAndUpdate(id, updateInput, {
        new: true,
        session: options?.session,
      })
      .exec();
  }

  async updateOne(
    filter: any = {},
    updateInput: any,
    options?: { session?: ClientSession },
  ): Promise<void> {
    await this.model
      .findOneAndUpdate(filter, updateInput, {
        new: true,
        session: options?.session,
      })
      .exec();
  }

  async bulkWrite(
    operations: any[],
    options?: { session?: ClientSession },
  ): Promise<any> {
    return await this.model.bulkWrite(operations, {
      session: options?.session,
    });
  }

  async inserMany(
    items: any[],
    options?: { session?: ClientSession },
  ): Promise<void> {
    await this.model.insertMany(items, { session: options?.session });
  }

  async delete(
    id: IDType,
    options?: { session?: ClientSession },
  ): Promise<void> {
    await this.model
      .findByIdAndDelete(id, { session: options?.session })
      .exec();
  }

  async deleteOne(
    filter: any = {},
    options?: { session?: ClientSession },
  ): Promise<void> {
    await this.model
      .findOneAndDelete(filter, { session: options?.session })
      .exec();
  }

  async bulkDelete(
    ids: IDType[],
    options?: { session?: ClientSession },
  ): Promise<boolean> {
    const wereRemoved = await this.model.deleteMany(
      { _id: { $in: ids } },
      { session: options?.session },
    );
    return wereRemoved.acknowledged;
  }

  async getTotalCount(): Promise<number> {
    const pipeline: PipelineStage[] = [{ $count: 'totalDocuments' }];
    const [searchData = {}] = await this.model.aggregate(pipeline).exec();
    return searchData.totalDocuments || 0;
  }

  async itemsCount(filter: any = {}): Promise<number> {
    const count = await this.model.countDocuments(filter).exec();
    return count ? count : 0;
  }

  async distinctByNumberId(): Promise<number[]> {
    const ids = await this.model.distinct('_id').exec();
    return Array.from(new Set(ids as unknown as number[]));
  }

  async deleteAllDocuments(): Promise<boolean> {
    const result = await this.model.deleteMany({});
    return result.acknowledged;
  }

  async updateMany(
    filter: any,
    updateData: any,
    options: UpdateOptions = {},
  ): Promise<number> {
    const result = await this.model
      .updateMany(filter, updateData, options)
      .exec();
    return result.modifiedCount;
  }
}
