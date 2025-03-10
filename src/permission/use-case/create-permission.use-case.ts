import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePermissionCommand } from '../command/create-permission/create-permission.command';
import {
  CreatePermissionInput,
  CreatePermissionOutput,
} from '../dto/create-permission.dto';
import { PermissionHelepr } from '../helper/permission-helper';

@Injectable()
export class CreatePermissionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly helper: PermissionHelepr,
  ) {}

  async createPermission(
    input: CreatePermissionInput,
  ): Promise<CreatePermissionOutput> {
    try {
      input.parent && (await this.helper.validatePermissionId(input.parent));
      await this.helper.validatePermissionName(input.name, null);
      await this.helper.validatePermissionTitle(input.title, null);

      await this.commandBus.execute(new CreatePermissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
