import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class DeleteMessageInput {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class DeleteMessageOutput extends CoreOutput {}
