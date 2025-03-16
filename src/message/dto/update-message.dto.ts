import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';
import { CreateMessageInput } from './create-message.dto';

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class UpdateMessageOutput extends CoreOutput {}
