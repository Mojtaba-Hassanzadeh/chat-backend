import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { QueryBus } from '@nestjs/cqrs';
import { GqlExecutionContext } from '@nestjs/graphql/dist/services/gql-execution-context';
import { PermissionType } from 'common/permissions/permission-base';
import { PermissionHelper } from 'src/permission/helper/permission-helper';
import { PERMISSION_KEY } from '../constants/common.constant';
import { RoleModel } from 'src/role/model/role.model';
import { FindRoleByIdsQuery } from 'src/role/query/find-role-by-ids/find-role-by-ids.query';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly queryBus: QueryBus,
    private readonly permissionHelper: PermissionHelper,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const context = GqlExecutionContext.create(ctx);

    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionType[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    // If no permissions are required, allow access.
    if (!requiredPermissions) return true;

    const { user } = context.getContext().req;

    if (!user) throw new UnauthorizedException('NO_LOGIN_ERROR_MESSAGE');

    const rolePermissionNames = await this.getPermissionsFromRoles(user.roles);
    if (this.hasRequiredPermission(rolePermissionNames, requiredPermissions))
      return true;

    const userPermissionNames = await this.getPermissionsFromUser(
      user.permissions,
    );

    if (this.hasRequiredPermission(userPermissionNames, requiredPermissions))
      return true;

    throw new ForbiddenException('ACCESS_ERROR_MESSAGE');
  }

  private async getPermissionsFromRoles(roleIds: string[]): Promise<string[]> {
    const userRoles: RoleModel[] = await this.queryBus.execute(
      new FindRoleByIdsQuery({ ids: roleIds }),
    );
    const rolePermissionIds = userRoles.flatMap((role) =>
      role.getPermissions(),
    );

    const uniquePermissions = new Set<string>();

    const permissions =
      await this.permissionHelper.getPermissionWithChildes(rolePermissionIds);
    permissions.forEach(({ name }) => uniquePermissions.add(name));

    return Array.from(uniquePermissions);
  }

  private async getPermissionsFromUser(
    userPermissions: string[],
  ): Promise<string[]> {
    const uniquePermissions = new Set<string>();

    const permissions =
      await this.permissionHelper.getPermissionWithChildes(userPermissions);
    permissions.forEach(({ name }) => uniquePermissions.add(name));

    return Array.from(uniquePermissions);
  }

  private hasRequiredPermission(
    userPermissions: string[],
    requiredPermissions: PermissionType[],
  ): boolean {
    return requiredPermissions.some((permission) =>
      userPermissions.includes(permission.name),
    );
  }
}
