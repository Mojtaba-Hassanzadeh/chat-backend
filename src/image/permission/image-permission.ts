import {
  PermissionBase,
  PermissionType,
} from 'common/permissions/permission-base';

export class ImagePermission implements PermissionBase {
  static MAIN: PermissionType = { name: 'Image', title: 'عکس' };
  static CREATE: PermissionType = { name: 'createImage', title: 'ایجاد عکس' };
  static UPDATE: PermissionType = { name: 'updateImage', title: 'ویرایش عکس' };
  static DELETE: PermissionType = { name: 'deleteImage', title: 'حذف عکس' };
  static READ: PermissionType = { name: 'readImage', title: 'خواندن عکس' };
  static IMAGE_UPLOAD: PermissionType = {
    name: 'uploadImage',
    title: 'آپلود عکس',
  };

  static IMAGE_DOWNLOAD: PermissionType = {
    name: 'downloadImage',
    title: 'دانلود عکس',
  };
}
