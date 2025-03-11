import { Injectable } from '@nestjs/common';
import { ModelFactory } from 'common/repositories/model.factory';
import { ObjectId } from 'mongodb';
import { CreateRoleInput } from '../dto/create-role.dto';
import { RoleRepository } from '../role.repository';
import { RoleModel } from './role.model';

@Injectable()
export class RoleModelFactory implements ModelFactory<RoleModel> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create({
    name,
    title,
    permissions,
  }: CreateRoleInput): Promise<RoleModel> {
    const role = new RoleModel({
      _id: new ObjectId().toHexString(),
      name,
      title,
      permissions,
    });
    await this.roleRepository.create(role);
    return role;
  }
}
