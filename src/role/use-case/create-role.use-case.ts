import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateRoleCommand } from '../command/create-role/create-role.command';
import { CreateRoleInput, CreateRoleOutput } from '../dto/create-role.dto';
import { RoleHelepr } from '../helper/role-helper';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly roleHelper: RoleHelepr,
  ) {}

  async createRole(input: CreateRoleInput): Promise<CreateRoleOutput> {
    try {
      await this.roleHelper.validateRoleName(input.name, null);
      await this.roleHelper.validateRoleTitle(input.title, null);

      await this.commandBus.execute(new CreateRoleCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
