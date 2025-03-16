import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { MessageRepository } from '../../message.repository';
import { MessageModel } from '../../model/message.model';
import { FindOneMessageQuery } from './find-one-message.query';

@QueryHandler(FindOneMessageQuery)
export class FindOneMessageHandler
  implements IQueryHandler<FindOneMessageQuery>
{
  constructor(private readonly repository: MessageRepository) {}
  async execute({
    filter,
    fields,
    options,
  }: FindOneMessageQuery): Promise<MessageModel | null> {
    const result = this.repository.findOne(filter, fields, options);
    return result;
  }
}
