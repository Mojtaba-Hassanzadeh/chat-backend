import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@InputType()
export class GetProfileInput {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class GetProfileOutput extends CoreOutput {
  @Field(() => UserEntity, { nullable: true })
  result?: UserEntity;
}
