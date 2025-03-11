import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsObjectId } from 'common/decorators/is-object-id.decorator';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class DeleteOtpInput {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@InputType()
export class BulkDeleteOtpInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@ObjectType()
export class DeleteOtpOutput extends CoreOutput {}
