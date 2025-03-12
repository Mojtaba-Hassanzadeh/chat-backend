import { Injectable } from '@nestjs/common';
import { ModelEntityFactory } from 'common/repositories/model-entity';
import { ObjectId } from 'mongodb';
import { RoleEntity } from './role.entity';
import { RoleModel } from '../model/role.model';

@Injectable()
export class RoleEntityFactory
  implements ModelEntityFactory<RoleEntity, RoleModel>
{
  createFromModel(model: RoleModel): RoleEntity | null {
    if (!model) return null;
    return {
      _id: new ObjectId(model.getId()),
      name: model.getName(),
      title: model.getTitle(),
      permissions: model.getPermissions(),
    };
  }
  createFromEntity(entity: RoleEntity): RoleModel | null {
    if (!entity) return null;
    const { _id, name, title, permissions } = entity;
    return new RoleModel({ _id: _id.toHexString(), name, title, permissions });
  }
}
