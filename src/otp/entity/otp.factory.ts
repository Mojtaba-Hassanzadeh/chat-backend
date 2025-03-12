import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { OtpModel } from '../model/otp.model';
import { OtpEntity } from './otp.entity';
import { ModelEntityFactory } from 'common/repositories/model-entity';

@Injectable()
export class OtpEntityFactory
  implements ModelEntityFactory<OtpEntity, OtpModel>
{
  createFromModel(model: OtpModel): OtpEntity | null {
    if (!model) return null;
    return {
      _id: new ObjectId(model.getId()),
      phone: model.getPhone(),
      email: model.getEmail(),
      code: model.getCode(),
    };
  }
  createFromEntity(entity: OtpEntity): OtpModel | null {
    if (!entity) return null;
    const { _id, phone, email, code } = entity;

    return new OtpModel({ _id: _id.toHexString(), phone, email, code });
  }
}
