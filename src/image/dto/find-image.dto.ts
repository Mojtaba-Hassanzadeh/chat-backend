import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ImageEntity } from '../entity/image.entity';
import { IsObjectId } from 'common/decorators/is-object-id.decorator';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType()
export class FindImageByIdInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsObjectId()
  id: string;
}

@ObjectType()
export class FindImageOutput extends CoreOutput {
  @Field(() => ImageEntity, { nullable: true })
  @IsOptional()
  result?: ImageEntity;
}
