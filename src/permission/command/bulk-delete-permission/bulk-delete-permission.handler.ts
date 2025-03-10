import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from 'src/permission/permission.repository';
import { BulkDeletePermissionCommand } from './bulk-delete-permission.command';

@CommandHandler(BulkDeletePermissionCommand)
export class BulkDeletePermissionHandler
  implements ICommandHandler<BulkDeletePermissionCommand>
{
  constructor(private readonly repository: PermissionRepository) {}
  async execute(command: BulkDeletePermissionCommand) {
    const { bulkDeletePermissionInput } = command;
    await this.repository.bulkDelete(bulkDeletePermissionInput.ids);
  }
}
