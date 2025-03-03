import { registerEnumType } from '@nestjs/graphql';

export enum CollectionName {
  USERS = 'users',
}

registerEnumType(CollectionName, {
  name: 'CollectionName',
});
