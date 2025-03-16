import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { MessageRepository } from '../../message.repository';
import { MessageModel } from '../../model/message.model';
import { FindManyMessageQuery } from './find-many-message.query';

@QueryHandler(FindManyMessageQuery)
export class FindManyMessageHandler
  implements IQueryHandler<FindManyMessageQuery>
{
  constructor(private readonly repository: MessageRepository) {}

  async execute({
    filter,
    projection,
    options,
  }: FindManyMessageQuery): Promise<MessageModel[] | null> {
    const result = await this.repository.findMany(filter, projection, options);
    return result;
  }
}
