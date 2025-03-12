import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RoleModelFactory } from 'src/role/model/role-model.factory';
import { CreateRoleCommand } from './create-role.command';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(private readonly roleModelFactory: RoleModelFactory) {}

  async execute(command: CreateRoleCommand) {
    const { createRoleInput } = command;
    await this.roleModelFactory.create(createRoleInput);
  }
}
