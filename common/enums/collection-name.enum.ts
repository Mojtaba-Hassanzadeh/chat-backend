import { registerEnumType } from '@nestjs/graphql';

export enum CollectionName {
  USERS = 'users',
  PERMISSION = 'permission',
  USER_ROLE = 'userRole',
  OTP = 'otp',
  IMAGE = 'images',
  MESSAGES = 'messages',
}

registerEnumType(CollectionName, {
  name: 'CollectionName',
});
