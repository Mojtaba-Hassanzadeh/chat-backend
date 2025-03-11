import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateRoleCommand } from '../command/update-role/update-role.command';
import { UpdateRoleInput, UpdateRoleOutput } from '../dto/update-role.dto';
import { RoleHelepr } from '../helper/role-helper';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly roleHelper: RoleHelepr,
  ) {}

  async updateRole(input: UpdateRoleInput): Promise<UpdateRoleOutput> {
    try {
      await this.roleHelper.validateRoleId(input.roleId);
      await this.roleHelper.validateRoleName(input.name, input.roleId);
      await this.roleHelper.validateRoleTitle(input.title, input.roleId);

      await this.commandBus.execute(new UpdateRoleCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
