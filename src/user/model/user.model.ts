import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { UserModelDto } from '../dto/user-model.dto';
import { ImageObject } from 'common/entities/image-object.entity';
import { UserImageStatusEnum } from '../enum/user-image-status.enum';
import { SendSmsEvent } from '../event/send-sms-event/send-otp-with-sms.event';
import { SendEmailEvent } from '../event/send-email-event/send-otp-with-email.event';

export class UserModel extends AggregateRoot {
  constructor(private readonly userModelDto: UserModelDto) {
    super();
  }

  getId(): string {
    return this.userModelDto._id;
  }

  getDisplayName(): string {
    return this.userModelDto.displayName;
  }

  getUsername(): string {
    return this.userModelDto.username;
  }

  getEmail(): string {
    return this.userModelDto.email;
  }

  getPhone(): string {
    return this.userModelDto.phone;
  }

  getRoles(): string[] {
    return this.userModelDto.roles;
  }

  getPermissions(): string[] {
    return this.userModelDto.permissions;
  }

  getPassword(): string {
    return this.userModelDto.password;
  }

  getIsVerified(): boolean {
    return this.userModelDto.isVerified;
  }

  getRefreshTokens(): string[] {
    return this.userModelDto.refreshToken;
  }

  getIsCreatedWithSocialMedia(): boolean {
    return this.userModelDto.isCreatedWithSocialMedia;
  }

  getAvatar(): ImageObject {
    return this.userModelDto.avatar;
  }

  getAvatarStatus(): UserImageStatusEnum {
    return this.userModelDto.avatarStatus;
  }

  sendOtpCodeWithSms(phone: string) {
    this.apply(new SendSmsEvent(phone));
  }

  sendOtpCodeWithEmail(email: string) {
    this.apply(new SendEmailEvent(email));
  }

  validatePassword(password: string) {
    return (
      this.userModelDto.password &&
      bcrypt.compare(password, this.userModelDto.password)
    );
  }
}
