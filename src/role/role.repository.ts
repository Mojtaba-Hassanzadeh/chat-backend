import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from 'common/constants/pagination.constant';
import { BaseRepository } from 'common/repositories/base-repository';
import { escapeRegex } from 'common/utils/escape-regx.util';
import { Model } from 'mongoose';
import { SearchRoleInput, SearchRoleOutput } from './dto/search-role.dto';
import { UpdateRoleInput } from './dto/update-role.dto';
import { RoleEntity, TRoleEntity } from './entity/role.entity';
import { RoleEntityFactory } from './entity/role.factory';
import { RoleModel } from './model/role.model';

@Injectable()
export class RoleRepository extends BaseRepository<
  RoleEntity,
  RoleModel,
  string
> {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly roleModel: Model<TRoleEntity>,
    private readonly roleFactory: RoleEntityFactory,
  ) {
    super(roleModel, roleFactory);
  }

  async search({
    count = DEFAULT_COUNT,
    page = DEFAULT_PAGE,
    text,
  }: SearchRoleInput): Promise<SearchRoleOutput> {
    const safeText = text ? escapeRegex(text) : undefined;

    const searchResults = await this.roleModel.aggregate([
      {
        $match: {
          ...(text && {
            $or: [
              { $text: { $search: text } },
              { name: { $regex: safeText, $options: 'i' } },
            ],
          }),
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
    ]);
    const [finalResults = {}] = searchResults;
    const totalCount = finalResults.totalCount?.[0]?.count || 0;

    return {
      success: true,
      results: finalResults.results || [],
      totalCount,
      totalPages: Math.ceil(totalCount / count),
    };
  }

  public async directCreate(roleEntity: RoleEntity): Promise<void> {
    const role = new this.roleModel(roleEntity);
    await role.save();
  }

  public async directUpdate({
    roleId,
    ...restOfArgs
  }: UpdateRoleInput): Promise<void> {
    await this.roleModel
      .findByIdAndUpdate(roleId, { ...restOfArgs }, { new: true })
      .exec();
  }
}
