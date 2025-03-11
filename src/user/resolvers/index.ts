import { UserMutationResolver } from './user-mutation.resolver';
import { UserQueryResolver } from './user-query.resolver';
import { UserResolver } from './user.resolver';

export const UserResolvers = [
  UserQueryResolver,
  UserMutationResolver,
  UserResolver,
];
