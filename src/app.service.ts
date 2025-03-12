import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { PermissionHelper } from './permission/helper/permission-helper';
import { RoleHelepr } from './role/helper/role-helper';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserPermission } from './user/permission/user-permission';
import { PermissionPerms } from './permission/permission/permission-permit';
import { RolePermission } from './role/permission/role-permission';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly permissionHelper: PermissionHelper,
    private readonly roleHelper: RoleHelepr,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async onModuleInit() {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.permissionHelper.autoCreatePermissions(UserPermission);
      await this.permissionHelper.autoCreatePermissions(PermissionPerms);
      await this.permissionHelper.autoCreatePermissions(RolePermission);

      // create ceo role
      await this.roleHelper.createCeoRole();
      // create simple user role
      await this.roleHelper.createUserRole();

      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(err);
    }
  }
}
