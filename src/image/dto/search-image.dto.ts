import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { PaginationInput, PaginationOutput } from 'common/dtos/pagination.dto';
import { ImageEntity } from '../entity/image.entity';

@InputType()
export class SearchImagesInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  filename?: string;
}

@ObjectType()
export class SearchImagesOutput extends PaginationOutput {
  @Field(() => [ImageEntity], { nullable: true })
  @IsOptional()
  results?: ImageEntity[];
}
