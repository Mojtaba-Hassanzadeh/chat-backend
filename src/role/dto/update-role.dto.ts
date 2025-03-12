import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { IsObjectId } from 'common/decorators/is-object-id.decorator';
import { CoreOutput } from 'common/dtos/output.dto';
import { CreateRoleInput } from './create-role.dto';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => String)
  @IsObjectId()
  roleId: string;
}

@ObjectType()
export class UpdateRoleOutput extends CoreOutput {}
