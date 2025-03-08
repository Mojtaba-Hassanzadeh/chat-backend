import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserModelFactory } from 'src/user/models/user-model.factory';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userFactory: UserModelFactory) {}

  async execute(command: CreateUserCommand) {
    const { createUserInput } = command;
    await this.userFactory.create(createUserInput);
  }
}
