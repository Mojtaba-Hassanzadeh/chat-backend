import {
  PermissionBase,
  PermissionType,
} from 'common/permissions/permission-base';

export class RolePermission implements PermissionBase {
  static MAIN: PermissionType = { name: 'role', title: 'نقش' };
  static CREATE: PermissionType = { name: 'createRole', title: 'ایجاد نقش' };
  static UPDATE: PermissionType = { name: 'updateRole', title: 'ویرایش نقش' };
  static DELETE: PermissionType = { name: 'deleteRole', title: 'حذف نقش' };
  static READ: PermissionType = { name: 'readRole', title: 'خواندن نقش' };
}
