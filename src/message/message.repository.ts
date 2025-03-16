import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'common/repositories/base-repository';
import { Model } from 'mongoose';
import { MessageEntity, TMessage } from './entities/message.entity';
import { MessageEntityFactory } from './entities/message.factory';
import { MessageModel } from './model/message.model';

@Injectable()
export class MessageRepository extends BaseRepository<
  MessageEntity,
  MessageModel,
  string
> {
  constructor(
    @InjectModel(MessageEntity.name)
    protected readonly messageModel: Model<TMessage>,
    protected readonly messageEntityFactory: MessageEntityFactory,
  ) {
    super(messageModel, messageEntityFactory);
  }
}
