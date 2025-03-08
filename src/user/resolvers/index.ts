import { UserMutationResolver } from './user-mutation.resolver';
import { UserQueryResolver } from './user-query.resolver';

export const UserResolvers = [UserQueryResolver, UserMutationResolver];
