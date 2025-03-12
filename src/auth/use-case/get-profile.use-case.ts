// user-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserEntityFactory } from 'src/user/entities/user.factory';
import { UserModel } from 'src/user/models/user.model';
import { FindUserByIdQuery } from 'src/user/queries/find-user-by-id/find-user-by-id.query';
import { GetProfileInput, GetProfileOutput } from '../dto/get-profile.dto';

@Injectable()
export class GetProfileUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userEntityFactory: UserEntityFactory,
  ) {}

  async getProfile({ id }: GetProfileInput): Promise<GetProfileOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindUserByIdQuery({ id }),
      );

      if (!user) throw new NotFoundException('USER_NOT_FOUND');

      return {
        success: true,
        result: this.userEntityFactory.createFromModel(user),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
