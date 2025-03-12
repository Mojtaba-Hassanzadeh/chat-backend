import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RoleRepository } from 'src/role/role.repository';
import { UpdateRoleCommand } from './update-role.command';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(command: UpdateRoleCommand) {
    const { updateRoleInput } = command;
    const { roleId, ...restOfArgs } = updateRoleInput;
    await this.roleRepository.update(roleId, restOfArgs);
  }
}
