import { BulkDeletePermissionHandler } from './bulk-delete-permission/bulk-delete-permission.handler';
import { CreatePermissionHandler } from './create-permission/create-permission.handler';
import { DeletePermissionHandler } from './delete-permission/delete-permission.handler';
import { UpdatePermissionHandler } from './update-permission/update-permission.handler';

export const PermissionCommandHandlers = [
  CreatePermissionHandler,
  UpdatePermissionHandler,
  DeletePermissionHandler,
  BulkDeletePermissionHandler,
];
