import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class GetImageTokenInput {
  userId: string;
}

@ObjectType()
export class GetImageTokenOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  imageAccessToken?: string;
}
