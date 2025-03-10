import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CreatePermissionInput } from './create-permission.dto';
import { IsObjectId } from 'common/decorators/is-object-id.decorator';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
  @Field(() => String)
  @IsObjectId()
  permissionId: string;
}

@ObjectType()
export class UpdatePermissionOutput extends CoreOutput {}
