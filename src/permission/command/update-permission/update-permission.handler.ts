import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from 'src/permission/permission.repository';
import { UpdatePermissionCommand } from './update-permission.command';

@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionHandler
  implements ICommandHandler<UpdatePermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(command: UpdatePermissionCommand) {
    const { updatePermissionInput } = command;
    await this.permissionRepository.update(updatePermissionInput);
  }
}
