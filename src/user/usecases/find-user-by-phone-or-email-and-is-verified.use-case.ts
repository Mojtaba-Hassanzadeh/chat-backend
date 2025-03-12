import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  FindUserByPhoneAndEmailInput,
  FindUserOutput,
} from '../dtos/find-user.dto';
import { UserEntityFactory } from '../entities/user.factory';
import { UserModel } from '../models/user.model';
import { FindOneUserQuery } from '../queries/find-one-user/find-one-user.query';

@Injectable()
export class FindUserByPhoneOrEmailAndIsVerifiedUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userFactory: UserEntityFactory,
  ) {}

  async findUserByPhoneOrEmailAndIsVerified({
    phone,
    email,
  }: FindUserByPhoneAndEmailInput): Promise<FindUserOutput> {
    try {
      let user: UserModel;
      if (phone) {
        user = await this.queryBus.execute(
          new FindOneUserQuery({ phone, isVerified: true }),
        );
      } else if (email) {
        user = await this.queryBus.execute(
          new FindOneUserQuery({ email, isVerified: true }),
        );
      }
      return {
        success: user ? true : false,
        result: this.userFactory.createFromModel(user),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
