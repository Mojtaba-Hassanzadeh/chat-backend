import { Field, InputType, PickType } from '@nestjs/graphql';
import { Matches } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';

@InputType()
export class SignupInput extends PickType(UserEntity, [
  'email',
  'displayName',
  'phone',
] as const) {
  @Field(() => String)
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/, {
    message: 'رمز عبور باید حداقل 6 کاراکتر ، حداقل یک حرف و یک عدد داشته باشد',
  })
  password: string;
}

@InputType()
export class SignupWithPhoneInput extends PickType(UserEntity, ['phone']) {}
