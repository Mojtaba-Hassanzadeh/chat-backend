import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindUserByIdInput, FindUserOutput } from '../dtos/find-user.dto';
import { UserEntityFactory } from '../entities/user.factory';
import { UserModel } from '../models/user.model';
import { FindUserByIdQuery } from '../queries/find-user-by-id/find-user-by-id.query';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userEntityFactory: UserEntityFactory,
  ) {}

  async findUserById({ id }: FindUserByIdInput): Promise<FindUserOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindUserByIdQuery({ id }),
      );
      if (!user) {
        throw new NotFoundException('USER_NOT_FOUND');
      }
      return {
        success: true,
        result: this.userEntityFactory.createFromModel(user),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
