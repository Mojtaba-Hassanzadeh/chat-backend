import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindManyUserOutput, FindUsersByRoleInput } from '../dto/find-user.dto';
import { UserEntityFactory } from '../entities/user.factory';
import { UserModel } from '../model/user.model';
import { FindManyUsersQuery } from '../query/find-many-users/find-many-users.query';

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
