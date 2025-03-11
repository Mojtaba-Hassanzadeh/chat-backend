import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { IsObjectId } from 'common/decorators/is-object-id.decorator';
import { CoreOutput } from 'common/dtos/output.dto';
import { RoleEntity } from '../entity/role.entity';

@InputType()
export class CreateRoleInput extends PickType(RoleEntity, [
  'name',
  'title',
] as const) {
  @Field(() => [String], { nullable: true })
  @IsObjectId({ each: true })
  @IsOptional()
  permissions?: string[];
}

@ObjectType()
export class CreateRoleOutput extends CoreOutput {}
