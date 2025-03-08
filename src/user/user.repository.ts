import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TUser, UserEntity } from './entities/user.entity';
import { Model, PipelineStage } from 'mongoose';
import { BaseRepository } from 'common/repositories/base-repository';
import { UserModel } from './models/user.model';
import { UserEntityFactory } from './entities/user.factory';
import { SearchUserInput, SearchUserOutput } from './dtos/search-user.dto';
import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from 'common/constants/pagination.constant';

@Injectable()
export class UserRepository extends BaseRepository<
  UserEntity,
  UserModel,
  string
> {
  constructor(
    @InjectModel(UserEntity.name)
    protected readonly userModel: Model<TUser>,
    protected readonly userEntityFactory: UserEntityFactory,
  ) {
    super(userModel, userEntityFactory);
  }

  async search({
    count = DEFAULT_COUNT,
    page = DEFAULT_PAGE,
    username,
    email,
    role,
  }: SearchUserInput): Promise<SearchUserOutput> {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...(username && { username }),
          ...(email && { email }),
          ...(role && { role }),
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $facet: {
          results: [{ $skip: (page - 1) * count }, { $limit: count }],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ];

    const [finalResults = {}] = await this.userModel.aggregate(pipeline);
    const totalCount = finalResults.totalCount?.[0]?.count || 0;

    return {
      success: true,
      results: finalResults.results,
      totalCount,
      totalPages: Math.ceil(totalCount / count),
    };
  }
}
