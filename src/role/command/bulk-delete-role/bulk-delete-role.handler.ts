import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RoleRepository } from 'src/role/role.repository';
import { BulkDeleteRoleCommand } from './bulk-delete-role.command';

@CommandHandler(BulkDeleteRoleCommand)
export class BulkDeleteRoleHandler
  implements ICommandHandler<BulkDeleteRoleCommand>
{
  constructor(private readonly roleRepository: RoleRepository) {}
  async execute(command: BulkDeleteRoleCommand) {
    const { bulkDeleteRoleInput } = command;
    await this.roleRepository.bulkDelete(bulkDeleteRoleInput.ids);
  }
}
