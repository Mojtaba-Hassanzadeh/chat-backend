import { Injectable } from '@nestjs/common';
import { ModelFactory } from 'common/repositories/model.factory';
import { ObjectId } from 'mongodb';
import { MessageModel } from './message.model';
import { MessageRepository } from '../message.repository';
import { CreateMessageInput } from '../dto/create-message.dto';

@Injectable()
export class MessageModelFactory implements ModelFactory<MessageModel> {
  constructor(private readonly messageRepository: MessageRepository) {}

  async create(input: CreateMessageInput): Promise<MessageModel> {
    const message = new MessageModel({
      _id: new ObjectId().toHexString(),
      ...input,
    });

    await this.messageRepository.create(message);
    return message;
  }
}
