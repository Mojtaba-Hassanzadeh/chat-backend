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
import { escapeRegex } from 'common/utils/escape-regx.util';

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
    text,
    email,
    phone,
    displayName,
    username,
    roles,
    permissions,
    isVerified,
  }: SearchUserInput): Promise<SearchUserOutput> {
    const safeText = text ? escapeRegex(text) : undefined;

    let isVerifiedFilter: PipelineStage[] = [];
    if (isVerified || isVerified === false) {
      isVerifiedFilter = [
        {
          $match: { isVerified },
        },
      ];
    }

    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...(text && {
            $or: [
              { $text: { $search: text } },
              { phone: { $regex: safeText, $options: 'i' } },
            ],
          }),

          ...(displayName && { displayName }),
          ...(username && { username }),
          ...(email && { email }),
          ...(phone && { phone }),
          ...(roles && { roles: { $in: roles } }),
          ...(permissions && { permissions: { $in: permissions } }),
        },
      },
      ...isVerifiedFilter,
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

  public async removeRoleFromUsers(roleId: string) {
    await this.userModel.updateMany({}, { $pull: { roles: roleId } });
  }

  public async findManyById(ids: string[]): Promise<UserModel[]> {
    const usersEntity = await this.userModel
      .find({ _id: { $in: ids } })
      .lean()
      .exec();

    const usersModel = await Promise.all(
      usersEntity.map((user) => this.userEntityFactory.createFromEntity(user)),
    );
    return usersModel;
  }
}
