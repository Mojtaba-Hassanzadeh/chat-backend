import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { IsObjectId } from 'common/decorators/is-object-id.decorator';
import { CoreOutput } from 'common/dtos/output.dto';
import { UploadImageInput } from './upload-image.dto';

@InputType('UpdateImageInput')
export class UpdateImageInput extends PartialType(
  PickType(UploadImageInput, ['alt']),
) {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@ObjectType('UpdateImageOutput')
export class UpdateImageOutput extends CoreOutput {}
