import {
  PermissionBase,
  PermissionType,
} from 'common/permissions/permission-base';

export class PermissionPerms implements PermissionBase {
  static MAIN: PermissionType = { name: 'permission', title: 'Permission' };
  static CREATE: PermissionType = {
    name: 'createPermission',
    title: 'Create Permission',
  };
  static UPDATE: PermissionType = {
    name: 'updatePermission',
    title: 'Update Permission',
  };
  static DELETE: PermissionType = {
    name: 'deletePermission',
    title: 'Delete Permission',
  };
  static READ: PermissionType = {
    name: 'readPermission',
    title: 'Read Permission',
  };
}
