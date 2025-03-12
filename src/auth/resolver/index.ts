import { AuthMutationResolver } from './auth-mutation.resolver';
import { AuthQueryResolver } from './auth-query.resolver';

export const AuthResolvers = [AuthQueryResolver, AuthMutationResolver];
