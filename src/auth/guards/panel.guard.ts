import { applyDecorators, UseGuards } from '@nestjs/common';
import { PermissionType } from 'common/permissions/permission-base';
import { Permissions } from '../decorators/permission.decorator';
import { AccessTokenGuard } from './access-token.guard';
import { PermissionGuard } from './permission.guard';

type GuardDecorator = ClassDecorator | MethodDecorator;

export function PanelGuard<T extends GuardDecorator = ClassDecorator>(
  ...inputPermissions: PermissionType[]
): T {
  const permissions = inputPermissions?.length ? inputPermissions : [];

  return applyDecorators(
    Permissions(...permissions),
    UseGuards(AccessTokenGuard, PermissionGuard),
  ) as unknown as T;
}
