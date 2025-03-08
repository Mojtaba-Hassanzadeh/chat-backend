import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';
// import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class CreateUserInput extends OmitType(UserEntity, [
  '_id',
  'createdAt',
  'updatedAt',
]) {}

@ObjectType()
export class CreateUserOutput {
  @Field(() => Boolean)
  success: boolean;
} //extends CoreOutput {}
