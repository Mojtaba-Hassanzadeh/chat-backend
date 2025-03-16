import { Injectable } from '@nestjs/common';
import { ModelEntityFactory } from 'common/repositories/model-entity';
import { UserEntity } from '../entities/user.entity';
import { ObjectId } from 'mongodb';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserEntityFactory
  implements ModelEntityFactory<UserEntity, UserModel>
{
  createFromModel(user: UserModel): UserEntity | null {
    if (!user) return null;
    return {
      _id: new ObjectId(user.getId()),
      displayName: user.getDisplayName(),
      username: user.getUsername(),
      email: user.getEmail(),
      phone: user.getPhone(),
      roles: user.getRoles(),
      permissions: user.getPermissions(),
      password: user.getPassword(),
      isVerified: user.getIsVerified(),
      refreshToken: user.getRefreshTokens(),
      isCreatedWithSocialMedia: user.getIsCreatedWithSocialMedia(),
      avatar: user.getAvatar(),
      avatarStatus: user.getAvatarStatus(),
    };
  }
  createFromEntity(userEntity: UserEntity): UserModel {
    if (!userEntity) return null;
    const {
      _id,
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
      avatar,
      avatarStatus,
    } = userEntity;

    return new UserModel({
      _id: _id.toHexString(),
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
      avatar,
      avatarStatus,
    });
  }
}
