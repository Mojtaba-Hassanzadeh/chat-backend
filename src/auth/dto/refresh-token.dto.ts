import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';

@ObjectType()
export class RefreshTokenOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;
}
