import { ObjectType } from '@nestjs/graphql';

@ObjectType('MessageQuery')
export class MessageQuery {}

@ObjectType('MessageMutation')
export class MessageMutation {}
