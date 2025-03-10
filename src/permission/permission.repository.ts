import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from 'common/constants/pagination.constant';
import { Model } from 'mongoose';
import { DeletePermissionInput } from './dto/delete-permission.dto';
import {
  FindPermissionByIdInput,
  FindPermissionByIdsInput,
} from './dto/find-permission.dto';
import {
  SearchPermissionInput,
  SearchPermissionOutput,
} from './dto/search-permission.dto';
import { UpdatePermissionInput } from './dto/update-permission.dto';
import {
  PermissionEntity,
  TPermissionEntity,
} from './entity/permission.entity';
import { PermissionEntityFactory } from './entity/permission.factory';
import { PermissionModel } from './model/permission.model';
import { escapeRegex } from 'common/utils/escape-regx.util';

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectModel(PermissionEntity.name)
    private readonly permissionModel: Model<TPermissionEntity>,
    private readonly permissionFactory: PermissionEntityFactory,
  ) {}

  public async findById({
    id,
  }: FindPermissionByIdInput): Promise<PermissionModel | null> {
    const permission = await this.permissionModel.findById(id).lean().exec();
    return this.permissionFactory.createFromEntity(permission);
  }

  async findManyById({
    ids,
  }: FindPermissionByIdsInput): Promise<PermissionModel[]> {
    const permissions = await this.permissionModel
      .find({ _id: { $in: ids } })
      .lean()
      .exec();
    return permissions.map((permission) =>
      this.permissionFactory.createFromEntity(permission),
    );
  }

  public async findByName(name: string): Promise<PermissionModel | null> {
    const permission = await this.permissionModel
      .findOne({ name })
      .lean()
      .exec();
    return this.permissionFactory.createFromEntity(permission);
  }

  public async findOneItemByName(
    name: string,
    id: string | null,
  ): Promise<PermissionModel | null> {
    const permission = await this.permissionModel
      .findOne({
        $and: [{ name }, { _id: { $ne: id } }],
      })
      .lean()
      .exec();
    return this.permissionFactory.createFromEntity(permission);
  }

  public async findOneItemByTitle(
    title: string,
    id: string | null,
  ): Promise<PermissionModel | null> {
    const permission = await this.permissionModel
      .findOne({
        $and: [{ title }, { _id: { $ne: id } }],
      })
      .lean()
      .exec();
    return this.permissionFactory.createFromEntity(permission);
  }

  public async findAll(): Promise<PermissionEntity[]> {
    return this.permissionModel.find().lean().exec();
  }

  public async findPermissionsWithChilds(
    parents: string[],
  ): Promise<PermissionEntity[]> {
    const result = await this.permissionModel
      .find({ $or: [{ _id: { $in: parents } }, { parent: { $in: parents } }] })
      .lean()
      .exec();
    return result;
  }

  async search({
    count = DEFAULT_COUNT,
    page = DEFAULT_PAGE,
    text,
    parent,
    isRootParent,
  }: SearchPermissionInput): Promise<SearchPermissionOutput> {
    const safeText = text ? escapeRegex(text) : undefined;

    const searchResults = await this.permissionModel.aggregate([
      {
        $match: {
          ...(text && {
            $or: [
              { $text: { $search: text } },
              { name: { $regex: safeText, $options: 'i' } },
            ],
          }),
          ...(parent && { parent }),
          ...(isRootParent === true && {
            $or: [
              { parent: { $exists: false } },
              { parent: null },
              { parent: '' },
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

  public async directCreate(
    permissionInput: PermissionEntity,
  ): Promise<string> {
    const permission = new this.permissionModel(permissionInput);
    await permission.save();
    return permission._id.toString();
  }

  public async create(permissionInput: PermissionModel): Promise<void> {
    const permission = new this.permissionModel(
      this.permissionFactory.createFromModel(permissionInput),
    );
    await permission.save();
  }

  public async update({
    permissionId,
    ...restOfArgs
  }: UpdatePermissionInput): Promise<void> {
    await this.permissionModel
      .findByIdAndUpdate(permissionId, { ...restOfArgs }, { new: true })
      .exec();
  }

  public async delete({ permissionId }: DeletePermissionInput): Promise<void> {
    await this.permissionModel.findByIdAndDelete(permissionId).exec();
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.permissionModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }
}
