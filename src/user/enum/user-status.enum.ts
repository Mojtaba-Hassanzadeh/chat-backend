import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  AWAY = 'away',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
});
