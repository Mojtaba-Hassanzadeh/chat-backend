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
      const { email } = input;

      const user: UserModel | null = await this.queryBus.execute(
        new FindOneUserQuery({ email }),
      );
      if (user) throw new BadRequestException('The email already exists');

      await this.commandBus.execute(new CreateUserCommand(input));

      this.logger.log('User created successfully');
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
