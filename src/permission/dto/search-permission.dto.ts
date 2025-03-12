import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationInput, PaginationOutput } from 'common/dtos/pagination.dto';
import { PermissionEntity } from '../entity/permission.entity';

@InputType('SearchPermissionInput')
export class SearchPermissionInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  text?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  parent?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isRootParent?: boolean;
}

@ObjectType('SearchPermissionOutput')
export class SearchPermissionOutput extends PaginationOutput {
  @Field(() => [PermissionEntity], { nullable: true })
  results?: PermissionEntity[];
}
