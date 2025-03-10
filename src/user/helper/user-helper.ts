import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindUserByIdQuery } from '../queries/find-user-by-id/find-user-by-id.query';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserHelper {
  constructor(private readonly queryBus: QueryBus) {}

  async validateUserId(id: string) {
    const user: UserModel = await this.queryBus.execute(
      new FindUserByIdQuery({ id }),
    );
    if (!user) {
      throw new NotFoundException('USER_ID_IS_NOT_CORRECT');
    }
  }
}
