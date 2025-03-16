import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { CoreOutput } from 'common/dtos/output.dto';
import { UserEntity } from '../entities/user.entity';
import { IsObjectId } from 'common/decorators/is-object-id.decorator';

@InputType()
export class FindUserByIdInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString()
  @IsOptional()
  fields?: string[];
}

@InputType()
export class FindUserByEmailInput {
  @Field(() => String)
  @IsEmail({}, { message: 'ENTERED_EMAIL_FORMAT_NOT_CORRECT' })
  @IsString()
  email: string;
}

@InputType()
export class FindUserByPhoneInput {
  @Field(() => String)
  @IsPhoneNumber('IR', { message: 'ENTERED_PHONE_NUMBER_FORMAT_NOT_CORRECT' })
  @IsString()
  phone: string;
}

@InputType()
export class FindUserByPhoneAndEmailInput {
  @Field(() => String, { nullable: true })
  @ValidateIf((o) => !o.email)
  @IsPhoneNumber('IR', { message: 'ENTERED_PHONE_NUMBER_FORMAT_NOT_CORRECT' })
  @IsString()
  phone?: string;

  @Field(() => String, { nullable: true })
  @ValidateIf((o) => !o.phone)
  @IsEmail({}, { message: 'ENTERED_EMAIL_FORMAT_NOT_CORRECT' })
  @IsString()
  email?: string;
}

@InputType()
export class FindUsersByRoleInput {
  @Field(() => String)
  @IsObjectId()
  roleId: string;
}

@ObjectType()
export class FindUserOutput extends CoreOutput {
  @Field(() => UserEntity, { nullable: true })
  @IsOptional()
  result?: UserEntity;
}

@InputType()
export class FindUsersByIdsInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class FindManyUserOutput extends CoreOutput {
  @Field(() => [UserEntity], { nullable: true })
  results?: UserEntity[];
}
