// Permission-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindOneRoleQuery } from '../query/find-one-role/find-one-role.query';
import { ROLE_NOT_FOUND } from '../constant/role.constant';
import { FindRoleByNameInput, FindRoleOutput } from '../dto/find-role.dto';
import { RoleEntityFactory } from '../entity/role.factory';
import { RoleModel } from '../model/role.model';

@Injectable()
export class FindRoleByNameUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly roleFactory: RoleEntityFactory,
  ) {}

  async findRoleByName({ name }: FindRoleByNameInput): Promise<FindRoleOutput> {
    try {
      const role: RoleModel = await this.queryBus.execute(
        new FindOneRoleQuery({ name }),
      );
      if (!role) {
        throw new NotFoundException(ROLE_NOT_FOUND);
      }
      return {
        success: true,
        result: this.roleFactory.createFromModel(role),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
