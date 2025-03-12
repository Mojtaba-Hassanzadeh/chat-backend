import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CoreOutput } from 'common/dtos/output.dto';
import { CreateUserCommand } from 'src/user/commands/create-user/create-user.command';
import { UserModel } from 'src/user/models/user.model';
import { SignupInput } from '../dto/signup.dto';
import { FindOneUserQuery } from 'src/user/queries/find-one-user/find-one-user.query';

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async signup(input: SignupInput): Promise<CoreOutput> {
    try {
      let user: UserModel;
      user = await this.queryBus.execute(
        new FindOneUserQuery({ phone: input.phone }),
      );
      if (user) {
        throw new BadRequestException('USER_ALREADY_EXISTS');
      }

      user = await this.queryBus.execute(
        new FindOneUserQuery({ email: input.email }),
      );
      if (user) {
        throw new BadRequestException('USER_ALREADY_EXISTS');
      }
      await this.commandBus.execute(new CreateUserCommand(input));

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
