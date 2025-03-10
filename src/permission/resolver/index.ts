import { PermissionMutationResolver } from './permission-mutation.resolver';
import { PermissionQueryResolver } from './permission-query.resolver';
import { PermissionResolver } from './permission.resolver';

export const PermissionResolvers = [
  PermissionQueryResolver,
  PermissionMutationResolver,
  PermissionResolver,
];
