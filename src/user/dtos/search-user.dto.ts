import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { PaginationInput, PaginationOutput } from 'common/dtos/pagination.dto';
import { UserRole } from '../enums/user-role.enum';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class SearchUserInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  username?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  email?: string;

  @Field(() => UserRole, { nullable: true })
  @IsOptional()
  role?: UserRole;
}

@ObjectType()
export class SearchUserOutput extends PaginationOutput {
  @Field(() => [UserEntity], { nullable: true })
  results?: UserEntity[];
}
