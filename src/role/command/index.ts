import { BulkDeleteRoleHandler } from './bulk-delete-role/bulk-delete-role.handler';
import { CreateRoleHandler } from './create-role/create-role.handler';
import { DeleteRoleHandler } from './delete-role/delete-role.handler';
import { UpdateRoleHandler } from './update-role/update-role.handler';

export const RoleCommandHandlers = [
  CreateRoleHandler,
  UpdateRoleHandler,
  DeleteRoleHandler,
  BulkDeleteRoleHandler,
];
