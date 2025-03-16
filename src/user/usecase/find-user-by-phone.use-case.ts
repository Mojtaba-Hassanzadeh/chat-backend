import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserEntityFactory } from '../entities/user.factory';
import { FindUserByPhoneInput, FindUserOutput } from '../dto/find-user.dto';
import { UserModel } from '../model/user.model';
import { FindOneUserQuery } from '../query/find-one-user/find-one-user.query';

@Injectable()
export class FindUserByPhoneUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userFactory: UserEntityFactory,
  ) {}

  async findUserByPhone({
    phone,
  }: FindUserByPhoneInput): Promise<FindUserOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindOneUserQuery({ phone }),
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
