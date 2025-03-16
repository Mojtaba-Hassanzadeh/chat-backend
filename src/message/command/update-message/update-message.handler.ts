import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MessageRepository } from '../../message.repository';
import { UpdateMessageCommand } from './update-message.command';

@CommandHandler(UpdateMessageCommand)
export class UpdateMessageHandler
  implements ICommandHandler<UpdateMessageCommand>
{
  constructor(private readonly repository: MessageRepository) {}

  async execute(command: UpdateMessageCommand) {
    const { updateMessageInput } = command;
    const { id, ...restOfArgs } = updateMessageInput;
    await this.repository.update(id, restOfArgs);
  }
}
