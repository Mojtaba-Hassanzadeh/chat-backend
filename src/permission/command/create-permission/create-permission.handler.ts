import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionCommand } from './create-permission.command';
import { PermissionModelFactory } from 'src/permission/model/permission-model.factory';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler
  implements ICommandHandler<CreatePermissionCommand>
{
  constructor(
    private readonly permissionModelFactory: PermissionModelFactory,
  ) {}

  async execute(command: CreatePermissionCommand) {
    const { createPermissionInput } = command;
    await this.permissionModelFactory.create(createPermissionInput);
  }
}
