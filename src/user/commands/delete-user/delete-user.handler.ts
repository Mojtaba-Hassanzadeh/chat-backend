import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/user/user.repository';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ deleteUserInput }: DeleteUserCommand): Promise<void> {
    const { id } = deleteUserInput;
    await this.userRepository.delete(id);
  }
}
