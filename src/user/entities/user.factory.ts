import { Injectable } from '@nestjs/common';
import { ModelEntityFactory } from 'common/repositories/model-entity';
import { UserEntity } from '../entities/user.entity';
import { ObjectId } from 'mongodb';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserEntityFactory
  implements ModelEntityFactory<UserEntity, UserModel>
{
  createFromModel(user: UserModel): UserEntity | null {
    if (!user) return null;
    return {
      _id: new ObjectId(user.getId()),
      username: user.getUsername(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
      avatar: user.getAvatar(),
    };
  }
  createFromEntity(user: UserEntity): UserModel {
    if (!user) return null;
    const { _id, username, email, password, role, avatar } = user;

    return new UserModel({
      _id: _id.toHexString(),
      username,
      email,
      password,
      role,
      avatar,
    });
  }
}
