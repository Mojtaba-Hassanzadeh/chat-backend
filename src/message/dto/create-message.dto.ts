import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';
import { MessageEntity } from '../entities/message.entity';

@InputType()
export class CreateMessageInput extends OmitType(MessageEntity, [
  '_id',
  'createdAt',
  'updatedAt',
  'sender',
  'recipient',
] as const) {
  @Field(() => String)
  recipient: string;

  sender: string;
}

@ObjectType()
export class CreateMessageOutput extends CoreOutput {}
