import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';
import { Schema } from 'common/decorators/schema.decorator';
import { DefaultEntity } from 'common/entities/default.entity';
import { CollectionName } from 'common/enums/collection-name.enum';
import { Document } from 'common/types/document.type';
import { SchemaFactory } from 'common/utils/schema-factory.util';
import mongoose, { CallbackError } from 'mongoose';
import { PermissionEntity } from 'src/permission/entity/permission.entity';
import { RoleEntity } from 'src/role/entity/role.entity';
import { UserImageStatusEnum } from '../enums/user-image-status.enum';
import { ImageEntity } from 'src/image/entity/image.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.USERS })
export class UserEntity extends DefaultEntity {
  @Field(() => String, { nullable: true })
  @Prop()
  @IsOptional()
  @IsString()
  @Length(3, 30, {
    message: 'نام کاربری باید بین 3 تا 30 کاراکتر باشد',
  })
  displayName?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  @IsString()
  @IsOptional()
  @Length(3, 30, {
    message: 'نام کاربری باید بین 3 تا 30 کاراکتر باشد',
  })
  username?: string;

  @Prop({
    type: String,
    nullable: true,
    unique: true,
    sparse: true,
  })
  @IsOptional()
  @Field(() => String, { nullable: true })
  @ValidateIf((o: UserEntity) => !!(!o.phone || o.email))
  @IsEmail({}, { message: 'ENTERED_EMAIL_FORMAT_NOT_CORRECT' })
  email?: string;

  @Field(() => String, { nullable: true })
  @Prop({
    type: String,
    nullable: true,
    unique: true,
    sparse: true,
  })
  @IsOptional()
  @IsString()
  @ValidateIf((o: UserEntity) => !!(!o.email || o.phone))
  @IsPhoneNumber('IR', { message: 'ENTERED_PHONE_NUMBER_FORMAT_NOT_CORRECT' })
  phone?: string;

  @Field(() => [RoleEntity], { nullable: true })
  @Prop({ type: [String] })
  @IsString({ each: true })
  @IsOptional()
  roles?: string[];

  @Field(() => [PermissionEntity], { nullable: true })
  @Prop({ type: [String] })
  @IsString({ each: true })
  @IsOptional()
  permissions?: string[];

  @Prop({
    type: String,
    required: false,
    select: false,
  })
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/, {
    message: 'رمز عبور باید حداقل 6 کاراکتر ، حداقل یک حرف و یک عدد داشته باشد',
  })
  @IsOptional()
  password?: string;

  @Prop({
    type: Boolean,
    default: false,
    nullable: true,
  })
  @Field(() => Boolean, { nullable: true })
  isVerified?: boolean;

  @Prop({ type: [String], nullable: true })
  refreshToken?: string[];

  @Prop({
    type: Boolean,
    default: false,
  })
  @Field(() => Boolean, { nullable: true })
  isCreatedWithSocialMedia?: boolean;

  @Field(() => ImageEntity, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.Mixed })
  @IsOptional()
  avatar?: ImageEntity;

  @Prop({
    type: String,
    enum: [...Object.values(UserImageStatusEnum)],
    default: UserImageStatusEnum.DRAFT,
  })
  @Field(() => UserImageStatusEnum, { nullable: true })
  @IsEnum(UserImageStatusEnum)
  @IsOptional()
  avatarStatus?: UserImageStatusEnum;
}

type TUser = Document<UserEntity>;
const UserSchema = SchemaFactory(UserEntity);

UserSchema.index({ displayName: 'text', phone: 'text' });
UserSchema.index({ displayName: 1, phone: 1 });

export { UserSchema, TUser };

UserSchema.pre('save', async function (next) {
  const user = this as TUser;
  if (!user.password) {
    next();
    return;
  }
  if (!user.isModified('password')) return next();
  try {
    user.password = await bcrypt.hash(user.password, 10);
    return next();
  } catch (e) {
    return next(e as CallbackError);
  }
});
