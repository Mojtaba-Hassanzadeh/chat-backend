import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IsObjectId } from 'common/decorators/is-object-id.decorator';
import { CoreOutput } from 'common/dtos/output.dto';

@InputType('DeleteImageInput')
export class DeleteImageInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsObjectId()
  id: string;
}

@ObjectType('DeleteImageOutput')
export class DeleteImageOutput extends CoreOutput {}

@InputType('DeleteImagesInput')
export class DeleteImagesInput {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty()
  @IsObjectId({ each: true })
  ids: string[];
}
