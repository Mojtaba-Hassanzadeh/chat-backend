import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'common/dtos/output.dto';
import { MessageEntity } from '../entities/message.entity';

@InputType()
export class FindMessageByIdInput {
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
export class FindMessageOutput extends CoreOutput {
  @Field(() => MessageEntity, { nullable: true })
  @IsOptional()
  result?: MessageEntity;
}

@InputType()
export class FindMessagesByIdsInput {
  @Field(() => [String])
  ids: string[];

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString()
  @IsOptional()
  fields?: string[];
}

@ObjectType()
export class FindManyMessageOutput extends CoreOutput {
  @Field(() => [MessageEntity], { nullable: true })
  results?: MessageEntity[];
}
