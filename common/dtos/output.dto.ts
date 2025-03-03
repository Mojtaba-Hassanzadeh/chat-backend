import { Field } from '@nestjs/graphql';

export class CoreOutput {
  @Field(() => Boolean)
  success: boolean;
}
