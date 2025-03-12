import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class SendVerificationCodeInput {
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
}

@ObjectType()
export class SendVerificationCodeOutput extends CoreOutput {
  @Field(() => Boolean)
  isUserExists: boolean;
}
