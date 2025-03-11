import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PermissionEntity } from 'src/permission/entity/permission.entity';
import { RoleEntity } from '../entity/role.entity';
import RoleDataLoader from '../role.loader';

@Resolver(() => RoleEntity)
export class RoleResolver {
  constructor(private readonly loader: RoleDataLoader) {}
  @ResolveField(() => [PermissionEntity], { nullable: true })
  async permissions(@Parent() role: RoleEntity) {
    const permissionIds = role.permissions ? role.permissions : [];
    const permissions = await this.loader.batchPermission.load(permissionIds);
    if (permissions.length === 0) return [];
    return permissions;
  }
}
