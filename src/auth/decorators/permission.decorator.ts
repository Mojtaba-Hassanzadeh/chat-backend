import { SetMetadata } from '@nestjs/common';
import { PermissionType } from 'common/permissions/permission-base';
import { PERMISSION_KEY } from '../constants/common.constant';

export const Permissions = (...permission: PermissionType[]) =>
  SetMetadata(PERMISSION_KEY, permission);
