import { FindPermissionByIdHanler } from './find-permission-by-id/find-permission-by-id.handler';
import { FindPermissionByIdsHanler } from './find-permission-by-ids/find-permission-by-ids.handler';
import { FindPermissionByNameHanler } from './find-permission-by-name/find-permission-by-name.handler';
import { FindPermissionOneItemByNameHanler } from './find-permission-one-item-by-name/find-permission-one-item-by-name.handler';
import { FindPermissionOneItemByTitleHanler } from './find-permission-one-item-by-title/find-permission-one-item-by-title.handler';
import { SearchPermissionHanler } from './search-permission/search-permission.handler';

export const PermissionQueryHandlers = [
  SearchPermissionHanler,
  FindPermissionByIdHanler,
  FindPermissionByIdsHanler,
  FindPermissionByNameHanler,
  FindPermissionOneItemByNameHanler,
  FindPermissionOneItemByTitleHanler,
];
