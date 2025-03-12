import {
  PermissionBase,
  PermissionType,
} from 'common/permissions/permission-base';

export class ImageAccessTokenPermission implements PermissionBase {
  static MAIN: PermissionType = {
    name: 'getImageAccessToken',
    title: 'دریافت توکن تصاویر',
  };
  static CREATE: PermissionType = {
    name: 'createImage',
    title: 'ایجاد تصاویر',
  };
  static UPDATE: PermissionType = {
    name: 'updateImage',
    title: 'ویرایش تصاویر',
  };
  static DELETE: PermissionType = {
    name: 'deleteImage',
    title: 'حذف تصاویر',
  };
  static READ: PermissionType = {
    name: 'readImage',
    title: 'خواندن تصاویر',
  };
}
