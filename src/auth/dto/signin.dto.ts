import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class SigninInput {
  @Field(() => String, { nullable: true })
  @ValidateIf((o) => !o.email)
  @IsString()
  @IsPhoneNumber('IR', { message: 'ENTERED_PHONE_NUMBER_FORMAT_NOT_CORRECT' })
  phone?: string;

  @Field(() => String, { nullable: true })
  @ValidateIf((o) => !o.phone)
  @IsString()
  @IsEmail({}, { message: 'ENTERED_EMAIL_FORMAT_NOT_CORRECT' })
  email?: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class SigninWitOtpInput {
  @Field(() => String, { nullable: true })
  @ValidateIf((o) => !o.email)
  @IsString()
  @IsPhoneNumber('IR', { message: 'ENTERED_PHONE_NUMBER_FORMAT_NOT_CORRECT' })
  phone?: string;

  @Field(() => String, { nullable: true })
  @ValidateIf((o) => !o.phone)
  @IsString()
  @IsEmail({}, { message: 'ENTERED_EMAIL_FORMAT_NOT_CORRECT' })
  email?: string;

  @Field(() => String)
  code?: string;
}

@ObjectType()
export class SigninOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;
}
