import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MessageModel } from '../../model/message.model';
import { MessageModelFactory } from '../../model/message-model.factory';
import { CreateMessageCommand } from './create-message.command';

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler
  implements ICommandHandler<CreateMessageCommand>
{
  constructor(private readonly messageModelFactory: MessageModelFactory) {}

  async execute(command: CreateMessageCommand): Promise<MessageModel> {
    const { createMessageInput } = command;
    const message = await this.messageModelFactory.create(createMessageInput);
    return message;
  }
}
