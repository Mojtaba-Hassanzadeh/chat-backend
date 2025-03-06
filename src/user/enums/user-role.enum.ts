import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
