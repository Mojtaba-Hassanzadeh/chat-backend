// Permission-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PERMISSION_NOT_FOUND } from '../constant/error-message.constant';
import {
  FindPermissionByNameInput,
  FindPermissionOutput,
} from '../dto/find-permission.dto';
import { PermissionEntityFactory } from '../entity/permission.factory';
import { PermissionModel } from '../model/permission.model';
import { FindPermissionByNameQuery } from '../query/find-permission-by-name/find-permission-by-name.query';

@Injectable()
export class FindPermissionByNameUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly permissionFactory: PermissionEntityFactory,
  ) {}

  async findPermissionByName({
    name,
  }: FindPermissionByNameInput): Promise<FindPermissionOutput> {
    try {
      const permission: PermissionModel = await this.queryBus.execute(
        new FindPermissionByNameQuery(name),
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
