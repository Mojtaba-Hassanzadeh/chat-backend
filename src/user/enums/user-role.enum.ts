import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  CEO = 'ceo',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
