import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdatePermissionCommand } from '../command/update-permission/update-permission.command';
import {
  UpdatePermissionInput,
  UpdatePermissionOutput,
} from '../dto/update-permission.dto';
import { PermissionHelepr } from '../helper/permission-helper';

@Injectable()
export class UpdatePermissionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly helper: PermissionHelepr,
  ) {}

  async updatePermission(
    input: UpdatePermissionInput,
  ): Promise<UpdatePermissionOutput> {
    try {
      await this.helper.validatePermissionId(input.permissionId);
      input.parent && (await this.helper.validatePermissionId(input.parent));
      await this.helper.validatePermissionName(input.name, input.permissionId);
      await this.helper.validatePermissionTitle(
        input.title,
        input.permissionId,
      );
      await this.commandBus.execute(new UpdatePermissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
