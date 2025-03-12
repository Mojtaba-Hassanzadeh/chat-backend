import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

@InputType()
export class SetPasswordInput {
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
  verificationCode: string;

  @Field(() => String)
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/, {
    message: 'رمز عبور باید حداقل 6 کاراکتر ، حداقل یک حرف و یک عدد داشته باشد',
  })
  password: string;
}

@InputType()
export class ValidateVerificationCodeInput {
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

  // @Field(() => String)
  // @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/, {
  //   message: 'رمز عبور باید حداقل 6 کاراکتر ، حداقل یک حرف و یک عدد داشته باشد',
  // })
  // password: string;

  @Field(() => String)
  code: string;
}
