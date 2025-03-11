import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BulkDeleteRoleCommand } from '../command/bulk-delete-role/bulk-delete-role.command';
import { BulkDeleteRoleInput, DeleteRoleOutput } from '../dto/delete-role.dto';
import { RoleHelepr } from '../helper/role-helper';
import { RemoveRoleFromUsersCommand } from 'src/user/commands/remove-role-from-users/remove-role-from-users.command';

@Injectable()
export class BulkDeleteRoleUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly roleHelper: RoleHelepr,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async bulkDeleteRole(input: BulkDeleteRoleInput): Promise<DeleteRoleOutput> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      for (const roleId of input.ids) {
        await this.roleHelper.validateRoleId(roleId);
      }

      await this.commandBus.execute(new BulkDeleteRoleCommand(input));

      for (const roleId of input.ids) {
        await this.commandBus.execute(new RemoveRoleFromUsersCommand(roleId));
      }

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
