import { FindOneRoleHandler } from './find-one-role/find-one-role.handler';
import { FindRoleByIdHanler } from './find-role-by-id/find-role-by-id.handler';
import { FindRoleByIdsHanler } from './find-role-by-ids/find-role-by-ids.handler';
import { SearchRoleHanler } from './search-role/search-role.handler';

export const RoleQueryHandlers = [
  SearchRoleHanler,
  FindRoleByIdHanler,
  FindOneRoleHandler,
  FindRoleByIdsHanler,
];
