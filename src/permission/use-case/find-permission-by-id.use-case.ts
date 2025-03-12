import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PERMISSION_NOT_FOUND } from '../constant/error-message.constant';
import {
  FindPermissionByIdInput,
  FindPermissionOutput,
} from '../dto/find-permission.dto';
import { PermissionEntityFactory } from '../entity/permission.factory';
import { PermissionModel } from '../model/permission.model';
import { FindPermissionByIdQuery } from '../query/find-permission-by-id/find-permission-by-id.query';

@Injectable()
export class FindPermissionByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly permissionFactory: PermissionEntityFactory,
  ) {}

  async findPermissionById({
    id,
  }: FindPermissionByIdInput): Promise<FindPermissionOutput> {
    try {
      const permission: PermissionModel = await this.queryBus.execute(
        new FindPermissionByIdQuery({ id: id }),
      );
      if (!permission) {
        throw new NotFoundException(PERMISSION_NOT_FOUND);
      }
      return {
        success: true,
        result: this.permissionFactory.createFromModel(permission),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
