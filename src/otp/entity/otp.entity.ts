import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { IsString } from 'class-validator';
import { Schema } from 'common/decorators/schema.decorator';
import { CollectionName } from 'common/enums/collection-name.enum';
import { Document } from 'common/types/document.type';
import { SchemaFactory } from 'common/utils/schema-factory.util';
import { ObjectId } from 'mongodb';

@InputType('OtpInputType', { isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.OTP })
export class OtpEntity {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => String, { nullable: true })
  @Prop()
  @IsString()
  phone?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  @IsString()
  email?: string;

  @Field(() => String)
  @Prop()
  @IsString()
  code: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: Date, expires: '10m' })
  createdAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;
}

export type TOtpEntity = Document<OtpEntity>;
export const OtpEntitySchema = SchemaFactory(OtpEntity);

OtpEntitySchema.pre('save', async function (next) {
  const otp = this as TOtpEntity;
  if (!otp.code) {
    next();
    return;
  }
  if (!otp.isModified('code')) return next();
  try {
    otp.code = await bcrypt.hash(otp.code, 10);
    return next();
  } catch (e) {
    return next(e as any);
  }
});

OtpEntitySchema.methods.validateCode = async function validateCode(
  data: string,
) {
  return bcrypt.compare(data, this.code);
};
