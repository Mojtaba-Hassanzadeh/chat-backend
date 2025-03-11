// Permission-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindRoleByIdsInput, FindManyRolesOutput } from '../dto/find-role.dto';
import { RoleEntityFactory } from '../entity/role.factory';
import { RoleModel } from '../model/role.model';
import { FindRoleByIdsQuery } from '../query/find-role-by-ids/find-role-by-ids.query';

@Injectable()
export class FindRoleByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly roleFactory: RoleEntityFactory,
  ) {}

  async findRoleByIds(input: FindRoleByIdsInput): Promise<FindManyRolesOutput> {
    try {
      const roles: RoleModel[] = await this.queryBus.execute(
        new FindRoleByIdsQuery(input),
      );

      const resultList = roles.map((model) =>
        this.roleFactory.createFromModel(model),
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
