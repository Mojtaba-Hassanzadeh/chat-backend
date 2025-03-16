import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PermissionEntity } from 'src/permission/entity/permission.entity';
import { RoleEntity } from 'src/role/entity/role.entity';
import { UserEntity } from '../entities/user.entity';
import UserDataLoader from '../user.loader';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly loader: UserDataLoader) {}

  @ResolveField(() => [PermissionEntity], { nullable: true })
  async permissions(@Parent() user: UserEntity) {
    if (!user.permissions || !user.permissions.length) return [];
    const permissions = await this.loader.batchPermission.load(
      user.permissions,
    );
    if (permissions.length === 0) return [];
    return permissions;
  }

  @ResolveField(() => [RoleEntity], { nullable: true })
  async roles(@Parent() user: UserEntity) {
    if (!user.roles || !user.roles.length) return [];
    const roles = await this.loader.batchRole.load(user.roles);
    if (roles.length === 0) return [];
    return roles;
  }
}
