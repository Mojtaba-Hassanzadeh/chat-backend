import { UpdateMessageInput } from '../../dto/update-message.dto';

export class UpdateMessageCommand {
  constructor(public readonly updateMessageInput: UpdateMessageInput) {}
}
