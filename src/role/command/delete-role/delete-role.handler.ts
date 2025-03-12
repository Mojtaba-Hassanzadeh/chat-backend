import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoleCommand } from './delete-role.command';
import { RoleRepository } from 'src/role/role.repository';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(command: DeleteRoleCommand) {
    const { deleteRoleInput } = command;
    await this.roleRepository.delete(deleteRoleInput.roleId);
  }
}
