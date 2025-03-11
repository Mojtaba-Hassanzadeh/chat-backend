// Permission-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ROLE_NOT_FOUND } from '../constant/role.constant';
import { FindRoleByIdInput, FindRoleOutput } from '../dto/find-role.dto';
import { RoleEntityFactory } from '../entity/role.factory';
import { RoleModel } from '../model/role.model';
import { FindRoleByIdQuery } from '../query/find-role-by-id/find-role-by-id.query';

@Injectable()
export class FindRoleByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly roleFactory: RoleEntityFactory,
  ) {}

  async findRoleByid(input: FindRoleByIdInput): Promise<FindRoleOutput> {
    try {
      const role: RoleModel = await this.queryBus.execute(
        new FindRoleByIdQuery(input),
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
