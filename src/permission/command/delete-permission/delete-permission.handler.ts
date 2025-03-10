import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePermissionCommand } from './delete-permission.command';
import { PermissionRepository } from 'src/permission/permission.repository';

@CommandHandler(DeletePermissionCommand)
export class DeletePermissionHandler
  implements ICommandHandler<DeletePermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute(command: DeletePermissionCommand) {
    const { deletePermissionInput } = command;
    await this.permissionRepository.delete(deletePermissionInput);
  }
}
