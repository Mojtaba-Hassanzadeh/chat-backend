import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'common/dtos/output.dto';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class FindUserByIdInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString()
  @IsOptional()
  fields?: string[];
}

@ObjectType()
export class FindUserOutput extends CoreOutput {
  @Field(() => UserEntity, { nullable: true })
  @IsOptional()
  result?: UserEntity;
}
