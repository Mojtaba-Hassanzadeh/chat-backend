import { RoleMutationResolver } from './role-mutation-resolver';
import { RoleQueryResolver } from './role-query-resolver';
import { RoleResolver } from './role.resolver';

export const RoleResolvers = [
  RoleQueryResolver,
  RoleMutationResolver,
  RoleResolver,
];
