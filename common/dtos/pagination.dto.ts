import { Field, Int } from '@nestjs/graphql';
import { CoreOutput } from './output.dto';

export class PaginationInput {
  @Field(() => Int, { defaultValue: 1, nullable: true })
  page: number;

  @Field(() => Int, { defaultValue: 24, nullable: true })
  count: number;
}

export class PaginationOutput extends CoreOutput {
  @Field(() => Int, { nullable: true })
  totalPages?: number;

  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
