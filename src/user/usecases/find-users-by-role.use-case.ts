import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  FindManyUserOutput,
  FindUsersByRoleInput,
} from '../dtos/find-user.dto';
import { UserEntityFactory } from '../entities/user.factory';
import { UserModel } from '../models/user.model';
import { FindManyUsersQuery } from '../queries/find-many-users/find-many-users.query';

@Injectable()
export class FindUsersByRoleUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly factory: UserEntityFactory,
  ) {}

  async findUsersByRole({
    roleId,
  }: FindUsersByRoleInput): Promise<FindManyUserOutput> {
    try {
      const users: UserModel[] = await this.queryBus.execute(
        new FindManyUsersQuery({ roles: roleId }),
      );

      const resultList = users.map((model) =>
        this.factory.createFromModel(model),
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
