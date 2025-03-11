import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsObjectId } from 'common/decorators/is-object-id.decorator';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class DeleteRoleInput {
  @Field(() => String)
  @IsObjectId()
  roleId: string;
}

@InputType()
export class BulkDeleteRoleInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@ObjectType()
export class DeleteRoleOutput extends CoreOutput {}
