import { registerEnumType } from '@nestjs/graphql';

export enum CollectionName {
  USERS = 'users',
  PERMISSION = 'permission',
}

registerEnumType(CollectionName, {
  name: 'CollectionName',
});
