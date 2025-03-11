import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';

import { FindOneRoleQuery } from '../query/find-one-role/find-one-role.query';
import {
  ROLE_ID_IS_NOT_CORRECT,
  ROLE_NAME_DUPLICATED,
  ROLE_TITLE_DUPLICATED,
  CEO_ROLE,
  SIMPLE_ROLE,
} from '../constant/role.constant';
import { RoleModel } from '../model/role.model';
import { FindRoleByIdQuery } from '../query/find-role-by-id/find-role-by-id.query';
import { RoleRepository } from '../role.repository';
import { PermissionHelper } from 'src/permission/helper/permission-helper';

@Injectable()
export class RoleHelepr {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly permissionHelepr: PermissionHelper,
    private readonly roleRepository: RoleRepository,
  ) {}

  async validateRoleId(roleId: string) {
    const role: RoleModel = await this.queryBus.execute(
      new FindRoleByIdQuery({ id: roleId }),
    );
    if (!role || role === null)
      throw new BadRequestException(ROLE_ID_IS_NOT_CORRECT);
  }

  async validateRoleName(name: string, roleId: string | null) {
    const role: RoleModel = await this.queryBus.execute(
      new FindOneRoleQuery({
        $and: [{ name }, { _id: { $ne: roleId } }],
      }),
    );
    if (role) throw new BadRequestException(ROLE_NAME_DUPLICATED);
  }

  async validateRoleTitle(title: string, roleId: string | null) {
    const role: RoleModel = await this.queryBus.execute(
      new FindOneRoleQuery({
        $and: [{ title }, { _id: { $ne: roleId } }],
      }),
    );
    if (role) throw new BadRequestException(ROLE_TITLE_DUPLICATED);
  }

  async createCeoRole() {
    const ceoRole = await this.roleRepository.findOne({ name: CEO_ROLE });
    const permissionIds = await this.permissionHelepr.getAllPermissionIds();
    if (!ceoRole) {
      await this.roleRepository.directCreate({
        _id: new ObjectId(),
        name: CEO_ROLE,
        title: 'مدیر ارشد',
        permissions: permissionIds,
      });
    } else {
      if (permissionIds.length != ceoRole.getPermissions().length) {
        this.roleRepository.directUpdate({
          roleId: ceoRole.getId(),
          permissions: permissionIds,
        });
      }
    }
  }

  async createUserRole() {
    const userRole = await this.roleRepository.findOne({ name: SIMPLE_ROLE });
    if (!userRole) {
      await this.roleRepository.directCreate({
        _id: new ObjectId(),
        name: SIMPLE_ROLE,
        title: 'کاربر ساده',
      });
    }
  }
}
