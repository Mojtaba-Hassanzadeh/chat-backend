import { ObjectType } from '@nestjs/graphql';

@ObjectType('UserQuery')
export class UserQuery {}

@ObjectType('UserMutation')
export class UserMutation {}
