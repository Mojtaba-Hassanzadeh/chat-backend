import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class DeleteUserInput {
  @Field(() => String)
  userId: string;
}

@ObjectType()
export class DeleteUserOutput extends CoreOutput {}
