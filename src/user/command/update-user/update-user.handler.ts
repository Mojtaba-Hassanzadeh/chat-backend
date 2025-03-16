import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { UserRepository } from 'src/user/user.repository';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ updateUserInput }: UpdateUserCommand) {
    const { id, ...restOfArgs } = updateUserInput;
    await this.userRepository.update(id, restOfArgs);
  }
}
