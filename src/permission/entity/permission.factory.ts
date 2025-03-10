import { Injectable } from '@nestjs/common';
import { ModelEntityFactory } from 'common/repositories/model-entity';
import { ObjectId } from 'mongodb';
import { PermissionModel } from '../model/permission.model';
import { PermissionEntity } from './permission.entity';

@Injectable()
export class PermissionEntityFactory
  implements ModelEntityFactory<PermissionEntity, PermissionModel>
{
  createFromModel(model: PermissionModel): PermissionEntity | null {
    if (!model) return null;
    return {
      _id: new ObjectId(model.getId()),
      name: model.getName(),
      title: model.getTitle(),
      parent: model.getParent(),
    };
  }
  createFromEntity(entity: PermissionEntity): PermissionModel | null {
    if (!entity) return null;
    const { _id, name, title, parent } = entity;

    return new PermissionModel({ _id: _id.toHexString(), name, title, parent });
  }
}
