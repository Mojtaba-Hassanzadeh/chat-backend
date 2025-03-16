import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { MessageCommandHandlers } from './command';
import { MessageEntity, MessageSchema } from './entities/message.entity';
import { MessageEntityFactory } from './entities/message.factory';
import { MessageRepository } from './message.repository';
import { MessageModelFactory } from './model/message-model.factory';
import { MessageQueryHandlers } from './query';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: MessageEntity.name,
        schema: MessageSchema,
      },
    ]),
  ],
  providers: [
    ...MessageQueryHandlers,
    ...MessageCommandHandlers,
    MessageRepository,
    MessageModelFactory,
    MessageEntityFactory,
  ],
  exports: [],
})
@Global()
export class MessageModule {}
