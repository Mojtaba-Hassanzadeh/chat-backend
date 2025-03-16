import { DeleteMessageInput } from '../../dto/delete-message.dto';

export class DeleteMessageCommand {
  constructor(public readonly deleteMessageInput: DeleteMessageInput) {}
}
