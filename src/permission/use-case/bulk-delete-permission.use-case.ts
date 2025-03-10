import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BulkDeletePermissionCommand } from '../command/bulk-delete-permission/bulk-delete-permission.command';
import {
  BulkDeletePermissionInput,
  DeletePermissionOutput,
} from '../dto/delete-permission.dto';
import { PermissionHelepr } from '../helper/permission-helper';

@Injectable()
export class BulkDeletePermissionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly helper: PermissionHelepr,
  ) {}

  async bulkDeletePermission(
    input: BulkDeletePermissionInput,
  ): Promise<DeletePermissionOutput> {
    try {
      for (const id of input.ids) {
        await this.helper.validatePermissionId(id);
      }

      await this.commandBus.execute(new BulkDeletePermissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
