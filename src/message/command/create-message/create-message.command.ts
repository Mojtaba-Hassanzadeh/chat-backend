import { CreateMessageInput } from '../../dto/create-message.dto';

export class CreateMessageCommand {
  constructor(public readonly createMessageInput: CreateMessageInput) {}
}
