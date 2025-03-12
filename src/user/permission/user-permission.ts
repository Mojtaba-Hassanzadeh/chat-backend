import {
  PermissionBase,
  PermissionType,
} from 'common/permissions/permission-base';

export class UserPermission implements PermissionBase {
  static MAIN: PermissionType = { name: 'user', title: 'User' };
  static CREATE: PermissionType = { name: 'createUser', title: 'Create User' };
  static UPDATE: PermissionType = { name: 'updateUser', title: 'Update User' };
  static DELETE: PermissionType = { name: 'deleteUser', title: 'Delete User' };
  static READ: PermissionType = { name: 'readUser', title: 'Read User' };
}
