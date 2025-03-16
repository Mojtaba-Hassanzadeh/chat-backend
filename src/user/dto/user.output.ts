import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';

import { UserEntity } from '../entities/user.entity';

@InputType('UserOutputInputType', { isAbstract: true })
@ObjectType('UserOutputType')
export class UserOutput extends OmitType(UserEntity, [
  '_id',
  'createdAt',
  'updatedAt',
  'password',
]) {
  @Field(() => String)
  _id: string;
}
