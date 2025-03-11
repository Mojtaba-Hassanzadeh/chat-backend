import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserEntityFactory } from '../entities/user.factory';
import { FindUserByEmailInput, FindUserOutput } from '../dtos/find-user.dto';
import { UserModel } from '../models/user.model';
import { FindOneUserQuery } from '../queries/find-one-user/find-one-user.query';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userFactory: UserEntityFactory,
  ) {}

  async findUserByEmail({
    email,
  }: FindUserByEmailInput): Promise<FindUserOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindOneUserQuery({ email }),
      );

      if (!user) {
        throw new NotFoundException('USER_NOT_FOUND');
      }
      return {
        success: true,
        result: this.userFactory.createFromModel(user),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
