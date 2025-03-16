import { Injectable } from '@nestjs/common';
import { ModelFactory } from 'common/repositories/model.factory';
import { ObjectId } from 'mongodb';
import { UserModel } from './user.model';
import { UserRepository } from '../user.repository';
import { CreateUserInput } from '../dto/create-user.dto';
import { QueryBus } from '@nestjs/cqrs';
import { FindOneRoleQuery } from 'src/role/query/find-one-role/find-one-role.query';
import { RoleModel } from 'src/role/model/role.model';
import { SIMPLE_ROLE } from 'src/role/constant/role.constant';

@Injectable()
export class UserModelFactory implements ModelFactory<UserModel> {
  constructor(
    private readonly repository: UserRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async create({
    displayName,
    username,
    email,
    phone,
    roles,
    permissions,
    password,
    isVerified,
    refreshToken,
    isCreatedWithSocialMedia,
  }: CreateUserInput): Promise<UserModel> {
    const simpleRole: RoleModel = await this.queryBus.execute(
      new FindOneRoleQuery({ name: SIMPLE_ROLE }),
    );
    const userRols: string[] = [];
    if (roles && roles.length) userRols.push(...roles);
    if (simpleRole) userRols.push(simpleRole.getId());
    const user = new UserModel({
      _id: new ObjectId().toHexString(),
      displayName,
      username,
      email,
      phone,
      roles: userRols,
      permissions,
      password,
      isVerified,
      refreshToken,
      isCreatedWithSocialMedia,
    });

    await this.repository.create(user);
    return user;
  }

  async createWithPhone(phone: string): Promise<UserModel> {
    const simpleRole: RoleModel = await this.queryBus.execute(
      new FindOneRoleQuery({ name: SIMPLE_ROLE }),
    );
    const user = new UserModel({
      _id: new ObjectId().toHexString(),
      phone,
      roles: simpleRole ? [simpleRole.getId()] : [],
    });
    await this.repository.create(user);
    user.sendOtpCodeWithSms(phone);
    return user;
  }

  async createWithEmail(email: string): Promise<UserModel> {
    const simpleRole: RoleModel = await this.queryBus.execute(
      new FindOneRoleQuery({ name: SIMPLE_ROLE }),
    );
    const user = new UserModel({
      _id: new ObjectId().toHexString(),
      email,
      roles: simpleRole ? [simpleRole.getId()] : [],
    });
    await this.repository.create(user);
    user.sendOtpCodeWithEmail(email);
    return user;
  }
}
