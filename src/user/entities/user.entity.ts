import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Schema } from 'common/decorators/schema.decorator';
import { DefaultEntity } from 'common/entities/default.entity';
import { CollectionName } from 'common/enums/collection-name.enum';
import { Document } from 'common/types/document.type';
import { SchemaFactory } from 'common/utils/schema-factory.util';
import { UserRole } from '../enums/user-role.enum';
import { CallbackError } from 'mongoose';

@InputType({ isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.USERS })
export class UserEntity extends DefaultEntity {
  @Prop({ type: String, required: true })
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  username: string;

  @Prop({ type: String, required: true, unique: true })
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Prop({ type: String, required: true })
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  password: string;

  @Prop({ type: String })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Prop({
    type: String,
    enum: [...Object.values(UserRole)],
    default: UserRole.USER,
  })
  @Field(() => UserRole, { nullable: true })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  // contacts: UserEntity[];
  // blockedUser: UserEntity[];
  // lastSeen: Date;
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
