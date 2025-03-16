import { CreateMessageHandler } from './create-message/create-message.handler';
import { DeleteMessageHandler } from './delete-message/delete-message.handler';
import { UpdateMessageHandler } from './update-message/update-message.handler';

export const MessageCommandHandlers = [
  CreateMessageHandler,
  UpdateMessageHandler,
  DeleteMessageHandler,
];
