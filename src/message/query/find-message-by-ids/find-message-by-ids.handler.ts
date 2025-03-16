import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { MessageRepository } from '../../message.repository';
import { MessageModel } from '../../model/message.model';
import { FindMessageByIdsQuery } from './find-message-by-ids.query';

@QueryHandler(FindMessageByIdsQuery)
export class FindMessageByIdsHandler
  implements IQueryHandler<FindMessageByIdsQuery>
{
  constructor(private readonly repository: MessageRepository) {}
  async execute({
    findMessagesGroupInput,
  }: FindMessageByIdsQuery): Promise<MessageModel[] | null> {
    const result = await this.repository.findManyByIds(
      findMessagesGroupInput.ids,
      findMessagesGroupInput.fields,
    );
    return result;
  }
}
