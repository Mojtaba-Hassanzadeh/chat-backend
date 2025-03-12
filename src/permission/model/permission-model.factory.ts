import { Injectable } from '@nestjs/common';
import { ModelFactory } from 'common/repositories/model.factory';
import { ObjectId } from 'mongodb';
import { CreatePermissionInput } from '../dto/create-permission.dto';
import { PermissionRepository } from '../permission.repository';
import { PermissionModel } from './permission.model';

@Injectable()
export class PermissionModelFactory implements ModelFactory<PermissionModel> {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create({
    name,
    title,
    parent,
  }: CreatePermissionInput): Promise<PermissionModel> {
    const permission = new PermissionModel({
      _id: new ObjectId().toHexString(),
      name,
      title,
      parent,
    });
    await this.permissionRepository.create(permission);
    return permission;
  }
}
