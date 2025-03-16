import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserEntityFactory } from '../entities/user.factory';
import { UserModel } from '../model/user.model';
import { FindUsersByIdsQuery } from '../query/find-users-by-ids/find-users-by-ids.query';
import { FindUsersByIdsInput, FindManyUserOutput } from '../dto/find-user.dto';

@Injectable()
export class FindUsersByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userEntityFactory: UserEntityFactory,
  ) {}

  async findUsersByIds({
    ids,
  }: FindUsersByIdsInput): Promise<FindManyUserOutput> {
    try {
      const userModels: UserModel[] = await this.queryBus.execute(
        new FindUsersByIdsQuery(ids),
      );
      const users = userModels.map((user) => {
        return this.userEntityFactory.createFromModel(user);
      });
      return {
        success: true,
        results: users,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
