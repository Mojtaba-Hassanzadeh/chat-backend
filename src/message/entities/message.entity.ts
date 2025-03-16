import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Schema } from 'common/decorators/schema.decorator';
import { DefaultEntity } from 'common/entities/default.entity';
import { CollectionName } from 'common/enums/collection-name.enum';
import { Document } from 'common/types/document.type';
import { SchemaFactory } from 'common/utils/schema-factory.util';
import { UserEntity } from 'src/user/entities/user.entity';
import { IsCorrectDate } from 'common/decorators/date-validation-decorator';
import { toPersianNormalDate } from 'common/middleware/to-perisan-normal-date.middleware';
import { MessageStatusType } from '../enum/message-status.enum';

@InputType({ isAbstract: true })
@ObjectType()
@Schema({ collection: CollectionName.MESSAGES })
export class MessageEntity extends DefaultEntity {
  @Prop({ type: String, ref: UserEntity.name })
  @Field(() => UserEntity)
  @IsString()
  @IsNotEmpty()
  sender: string;

  @Prop({ type: String, ref: UserEntity.name })
  @Field(() => UserEntity)
  @IsString()
  @IsNotEmpty()
  recipient: string;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  content?: string;

  @Field(() => String, { middleware: [toPersianNormalDate] })
  @Prop({ type: Date })
  @IsString()
  @IsCorrectDate()
  @IsNotEmpty()
  timestamp: string;

  @Prop({
    type: String,
    enum: [...Object.values(MessageStatusType)],
  })
  @Field(() => MessageStatusType)
  @IsEnum(MessageStatusType)
  status: MessageStatusType;
}

type TMessage = Document<MessageEntity>;
const MessageSchema = SchemaFactory(MessageEntity);

MessageSchema.index({ sender: 1 });
MessageSchema.index({ timestamp: 1 });

export { MessageSchema, TMessage };
