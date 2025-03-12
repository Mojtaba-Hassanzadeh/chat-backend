export interface PermissionType {
  name: string;
  title: string;
}

export abstract class PermissionBase {
  static MAIN: PermissionType;
  static CREATE: PermissionType;
  static UPDATE: PermissionType;
  static DELETE: PermissionType;
  static READ: PermissionType;
}
