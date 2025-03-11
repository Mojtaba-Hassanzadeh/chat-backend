import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

import { toPersianDate } from '../middleware/to-persian-date.middleware';

@InputType('ImageObjectInputType', { isAbstract: true })
@ObjectType('ImageObjectType')
export class ImageObject {
  @Field(() => String, { nullable: true })
  _id: ObjectId;

  @Prop({ type: String })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  alt?: string;

  @Prop({ type: String })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  filename: string;

  @Prop({ type: Number })
  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @Prop({ type: Number })
  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @Prop({ type: String })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  preview: string;

  @Field(() => String, { nullable: true, middleware: [toPersianDate] })
  createdAt?: string;

  @Field(() => String, { nullable: true, middleware: [toPersianDate] })
  updatedAt?: string;
}
