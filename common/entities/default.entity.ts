import { Field } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

export class DefaultEntity {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;
}
