import { ImageObject } from 'common/entities/image-object.entity';
import { UserImageStatusEnum } from '../enums/user-image-status.enum';

export class UserModelDto {
  _id: string;
  displayName?: string;
  username?: string;
  email?: string;
  phone?: string;
  roles?: string[];
  permissions?: string[];
  password?: string;
  isVerified?: boolean;
  refreshToken?: string[];
  isCreatedWithSocialMedia?: boolean;
  avatar?: ImageObject;
  avatarStatus?: UserImageStatusEnum;
}
