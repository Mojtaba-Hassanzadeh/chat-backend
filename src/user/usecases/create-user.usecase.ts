import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserInput, CreateUserOutput } from '../dtos/create-user.dto';
import { FindOneUserQuery } from '../queries/find-one-user/find-one-user.query';
import { UserModel } from '../models/user.model';
import { CreateUserCommand } from '../commands/create-user/create-user.command';

@Injectable()
export class CreateUserUsecase {
  private readonly logger = new Logger(CreateUserUsecase.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(input: CreateUserInput): Promise<CreateUserOutput> {
    try {
      let user: UserModel;
      if (input.phone) {
        user = await this.queryBus.execute(
          new FindOneUserQuery({ phone: input.phone }),
        );
      }
      if (user) throw new BadRequestException('USER_ALREADY_EXISTS');

      if (input.email) {
        user = await this.queryBus.execute(
          new FindOneUserQuery({ email: input.email }),
        );
      }
      if (user) throw new BadRequestException('USER_ALREADY_EXISTS');

      await this.commandBus.execute(new CreateUserCommand(input));

      this.logger.log('User created successfully');
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
