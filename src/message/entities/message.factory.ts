import { Injectable } from '@nestjs/common';
import { ModelEntityFactory } from 'common/repositories/model-entity';
import { MessageEntity } from '../entities/message.entity';
import { ObjectId } from 'mongodb';
import { MessageModel } from '../model/message.model';

@Injectable()
export class MessageEntityFactory
  implements ModelEntityFactory<MessageEntity, MessageModel>
{
  createFromModel(message: MessageModel): MessageEntity | null {
    if (!message) return null;
    return {
      _id: new ObjectId(message.getId()),
      sender: message.getSender(),
      recipient: message.getRecipiente(),
      content: message.getContent(),
      timestamp: message.getTimestamp(),
      status: message.getStatus(),
    };
  }
  createFromEntity(messageEntity: MessageEntity): MessageModel {
    if (!messageEntity) return null;
    const { _id, sender, recipient, content, timestamp, status } =
      messageEntity;

    return new MessageModel({
      _id: _id.toHexString(),
      sender,
      recipient,
      content,
      timestamp,
      status,
    });
  }
}
