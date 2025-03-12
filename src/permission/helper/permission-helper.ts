import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';

import { PermissionEntity } from '../entity/permission.entity';
import { PermissionBase } from 'common/permissions/permission-base';
import {
  PERMISSION_ID_IS_NOT_CORRECT,
  PERMISSION_NAME_DUPLICATED,
  PERMISSION_TITLE_DUPLICATED,
} from '../constant/error-message.constant';
import { PermissionModel } from '../model/permission.model';
import { PermissionRepository } from '../permission.repository';
import { FindPermissionByIdQuery } from '../query/find-permission-by-id/find-permission-by-id.query';
import { FindPermissionOneItemByNameQuery } from '../query/find-permission-one-item-by-name/find-permission-one-item-by-name.query';
import { FindPermissionOneItemByTitleQuery } from '../query/find-permission-one-item-by-title/find-permission-one-item-by-title.query';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoleModel } from 'src/role/model/role.model';
import { FindRoleByIdsQuery } from 'src/role/query/find-role-by-ids/find-role-by-ids.query';

@Injectable()
export class PermissionHelper {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly repository: PermissionRepository,
  ) {}

  async validatePermissionId(id: string) {
    const permission: PermissionModel = await this.queryBus.execute(
      new FindPermissionByIdQuery({ id }),
    );
    if (!permission || permission === null)
      throw new BadRequestException(PERMISSION_ID_IS_NOT_CORRECT);
  }

  async validatePermissionName(name: string, permId: string | null) {
    const permission: PermissionModel = await this.queryBus.execute(
      new FindPermissionOneItemByNameQuery(name, permId),
    );
    if (permission) throw new BadRequestException(PERMISSION_NAME_DUPLICATED);
  }

  async validatePermissionTitle(title: string, permId: string | null) {
    const permission: PermissionModel = await this.queryBus.execute(
      new FindPermissionOneItemByTitleQuery(title, permId),
    );
    if (permission) throw new BadRequestException(PERMISSION_TITLE_DUPLICATED);
  }

  async autoCreatePermissions<T extends typeof PermissionBase>(perm: T) {
    try {
      const permission: PermissionModel = await this.repository.findByName(
        perm.MAIN.name,
      );
      let parentId: string;

      if (!permission) {
        const permId: string = await this.repository.directCreate({
          _id: new ObjectId(),
          name: perm.MAIN.name,
          title: perm.MAIN.title,
        });
        parentId = permId;
      } else {
        parentId = permission.getId();
      }

      for (const key of Object.keys(perm)) {
        const dBermission: PermissionModel = await this.repository.findByName(
          perm[key].name,
        );

        if (!dBermission) {
          await this.repository.directCreate({
            _id: new ObjectId(),
            name: perm[key].name,
            title: perm[key].title,
            parent: parentId,
          });
        }
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getAllPermissionIds(): Promise<string[]> {
    try {
      const allPermission = await this.repository.findAll();
      const permissionIds =
        allPermission?.map(({ _id }) => _id.toHexString()) || [];
      return permissionIds;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getPermissionWithChildes(
    parents: string[],
  ): Promise<PermissionEntity[]> {
    try {
      const permissionWithChildes = new Map<string, PermissionEntity>();
      let queue = parents;

      while (queue.length) {
        // Fetch permissions for all items in the queue at once
        const permissions =
          await this.repository.findPermissionsWithChilds(queue);

        // Clear the queue and prepare a new one for the next level of child permissions
        queue = [];

        permissions?.forEach((permission) => {
          const id = permission._id.toHexString();
          if (!permissionWithChildes.has(id)) {
            permissionWithChildes.set(id, permission);
            queue.push(id); // Add the new child permission to the queue for the next iteration
          }
        });
      }

      return Array.from(permissionWithChildes.values());
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async canUserPerformAction({
    user,
    permission,
    message,
  }: {
    user: UserEntity;
    permission: PermissionModel;
    message: string;
  }): Promise<boolean> {
    const requiredPermissions = [permission.getId(), permission.getParent()];

    const rolePermissionIds = await this.getPermissionsFromRoles(user.roles);
    if (this.hasRequiredPermission(rolePermissionIds, requiredPermissions))
      return true;
    const userPermissionIds = await this.getPermissionsFromUser(
      user.permissions,
    );
    if (this.hasRequiredPermission(userPermissionIds, requiredPermissions))
      return true;

    throw new ForbiddenException(message);
  }

  private async getPermissionsFromRoles(roleIds: string[]): Promise<string[]> {
    const userRoles: RoleModel[] = await this.queryBus.execute(
      new FindRoleByIdsQuery({ ids: roleIds }),
    );
    const rolePermissionIds = userRoles.flatMap((role) =>
      role.getPermissions(),
    );

    const uniquePermissions = new Set<string>();

    const permissions = await this.getPermissionWithChildes(rolePermissionIds);
    permissions.forEach(({ _id }) => uniquePermissions.add(_id.toString()));

    return Array.from(uniquePermissions);
  }

  private async getPermissionsFromUser(
    userPermissions: string[],
  ): Promise<string[]> {
    const uniquePermissions = new Set<string>();

    const permissions = await this.getPermissionWithChildes(userPermissions);
    permissions.forEach(({ _id }) => uniquePermissions.add(_id.toString()));

    return Array.from(uniquePermissions);
  }

  private hasRequiredPermission(
    userPermissions: string[],
    requiredPermissions: string[],
  ): boolean {
    return requiredPermissions.some((permission) =>
      userPermissions.includes(permission),
    );
  }
}
