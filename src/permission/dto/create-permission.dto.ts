import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { PermissionEntity } from '../entity/permission.entity';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class CreatePermissionInput extends PickType(PermissionEntity, [
  'name',
  'title',
  'parent',
] as const) {}

@ObjectType()
export class CreatePermissionOutput extends CoreOutput {}
