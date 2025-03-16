import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/user/user.repository';
import { RemoveRoleFromUsersCommand } from './remove-role-from-users.command';

@CommandHandler(RemoveRoleFromUsersCommand)
export class RemoveRoleFromUsersHandler
  implements ICommandHandler<RemoveRoleFromUsersCommand>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ roleId }: RemoveRoleFromUsersCommand) {
    return this.userRepository.removeRoleFromUsers(roleId);
  }
}
