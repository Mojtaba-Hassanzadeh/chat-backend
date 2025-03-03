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
import { UserRole } from '../enum/user-role.enum';

@InputType({ isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.USERS })
export class UserEntity extends DefaultEntity {
  @Prop({ required: true, unique: true })
  @Field(() => String)
  username: string;

  @Prop({ required: true, unique: true })
  @Field(() => String)
  email: string;

  @Prop({ required: true })
  @Field(() => String)
  password: string;

  @Field(() => UserRole, { nullable: true })
  @Prop({ type: String })
  role?: string;

  hashedRefreshToken: string;
  isVerified: boolean;
  verificationCode: string;
  contacts: UserEntity[];
  blockedUser: UserEntity[];
  profilePicture: string;
  lastSeen: Date;
}

type TUser = Document<UserEntity>;
const UserSchema = SchemaFactory(UserEntity);

UserSchema.index({ displayName: 'text', phone: 'text' });
UserSchema.index({ displayName: 1, phone: 1 });

export { UserSchema, TUser };

// UserSchema.pre('save', async function (next) {
//   const user = this as TUser;
//   if (!user.password) {
//     next();
//     return;
//   }
//   if (!user.isModified('password')) return next();
//   try {
//     user.password = await bcrypt.hash(user.password, 10);
//     return next();
//   } catch (e) {
//     return next(e as CallbackError);
//   }
// });
