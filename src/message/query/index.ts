import { FindManyMessageHandler } from './find-many-message/find-many-message.handler';
import { FindMessageByIdHandler } from './find-message-by-id/find-message-by-id.handler';
import { FindMessageByIdsHandler } from './find-message-by-ids/find-message-by-ids.handler';
import { FindOneMessageHandler } from './find-one-message/find-one-message.handler';

export const MessageQueryHandlers = [
  FindMessageByIdHandler,
  FindMessageByIdsHandler,
  FindOneMessageHandler,
  FindManyMessageHandler,
];
