import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DeleteRoleCommand } from '../command/delete-role/delete-role.command';
import { RemoveRoleFromUsersCommand } from 'src/user/commands/remove-role-from-users/remove-role-from-users.command';
import { DeleteRoleInput, DeleteRoleOutput } from '../dto/delete-role.dto';
import { RoleHelepr } from '../helper/role-helper';

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly roleHelper: RoleHelepr,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async deleteRole(input: DeleteRoleInput): Promise<DeleteRoleOutput> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.roleHelper.validateRoleId(input.roleId);

      await this.commandBus.execute(new DeleteRoleCommand(input));

      await this.commandBus.execute(
        new RemoveRoleFromUsersCommand(input.roleId),
      );

      await session.commitTransaction();
      session.endSession();
      return { success: true };
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(err);
    }
  }
}
