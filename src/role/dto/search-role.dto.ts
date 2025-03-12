import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { PaginationInput, PaginationOutput } from 'common/dtos/pagination.dto';
import { RoleEntity } from '../entity/role.entity';

@InputType('SearchRoleInput')
export class SearchRoleInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  text?: string;
}

@ObjectType('SearchRoleOutput')
export class SearchRoleOutput extends PaginationOutput {
  @Field(() => [RoleEntity], { nullable: true })
  results?: RoleEntity[];
}
