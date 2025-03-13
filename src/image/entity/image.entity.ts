import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Schema } from 'common/decorators/schema.decorator';
import { DefaultEntity } from 'common/entities/default.entity';
import { CollectionName } from 'common/enums/collection-name.enum';
import { Document } from 'common/types/document.type';
import { SchemaFactory } from 'common/utils/schema-factory.util';

@InputType('ImageInputType', { isAbstract: true })
@ObjectType('ImageType')
@Schema({ collection: CollectionName.IMAGE })
export class ImageEntity extends DefaultEntity {
  @Prop({ type: String })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  alt?: string;

  @Prop({ type: String })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  filename: string;

  @Prop({ type: Number })
  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @Prop({ type: Number })
  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @Prop({ type: String })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  preview: string;
}

export type TImage = Document<ImageEntity>;
export const ImageSchema = SchemaFactory(ImageEntity);

ImageSchema.index({ filename: 1 });
ImageSchema.index({ filename: 'text' });
