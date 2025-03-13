import { InputType, OmitType } from '@nestjs/graphql';
import { ImageEntity } from '../entity/image.entity';

@InputType()
export class CreateImageInput extends OmitType(ImageEntity, [
  '_id',
  'createdAt',
  'updatedAt',
]) {}
