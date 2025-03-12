import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CreateUserInput } from './create-user.dto';
import { CoreOutput } from 'common/dtos/output.dto';
import { Matches, IsOptional } from 'class-validator';
import { FileUpload } from 'graphql-upload-minimal';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id: string;
}

@InputType()
export class UpdateUserByCeoInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  userId: string;
}

@InputType()
export class UpdateUserByUserInput extends PartialType(
  PickType(UserEntity, ['username', 'displayName', 'email', 'avatar']),
) {
  fileUpload?: FileUpload;

  @Field(() => String, { nullable: true })
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/, {
    message: 'رمز عبور باید حداقل 6 کاراکتر ، حداقل یک حرف و یک عدد داشته باشد',
  })
  @IsOptional()
  password?: string;
}

@ObjectType()
export class UpdateUserOutput extends CoreOutput {}
