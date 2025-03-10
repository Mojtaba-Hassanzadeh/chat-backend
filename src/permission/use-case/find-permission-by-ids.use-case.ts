// Permission-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  FindPermissionByIdsInput,
  FindManyPermissionsOutput,
} from '../dto/find-permission.dto';
import { PermissionEntityFactory } from '../entity/permission.factory';
import { PermissionModel } from '../model/permission.model';
import { FindPermissionByIdsQuery } from '../query/find-permission-by-ids/find-permission-by-ids.query';

@Injectable()
export class FindPermissionByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly permissionFactory: PermissionEntityFactory,
  ) {}

  async findPermissionByIds({
    ids,
  }: FindPermissionByIdsInput): Promise<FindManyPermissionsOutput> {
    try {
      const permissions: PermissionModel[] = await this.queryBus.execute(
        new FindPermissionByIdsQuery({ ids: ids }),
      );

      const resultList = permissions.map((model) =>
        this.permissionFactory.createFromModel(model),
      );
      return {
        success: true,
        results: resultList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
