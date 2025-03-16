import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MessageRepository } from '../../message.repository';
import { DeleteMessageCommand } from './delete-message.command';

@CommandHandler(DeleteMessageCommand)
export class DeleteMessageHandler
  implements ICommandHandler<DeleteMessageCommand>
{
  constructor(private readonly repository: MessageRepository) {}

  async execute(command: DeleteMessageCommand) {
    const { deleteMessageInput } = command;
    await this.repository.delete(deleteMessageInput.id);
  }
}
