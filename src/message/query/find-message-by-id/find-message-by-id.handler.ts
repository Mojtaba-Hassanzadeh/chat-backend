import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { MessageRepository } from '../../message.repository';
import { MessageModel } from '../../model/message.model';
import { FindMessageByIdQuery } from './find-message-by-id.query';

@QueryHandler(FindMessageByIdQuery)
export class FindMessageByIdHandler
  implements IQueryHandler<FindMessageByIdQuery>
{
  constructor(private readonly repository: MessageRepository) {}
  async execute({
    findMessageByIdInput,
  }: FindMessageByIdQuery): Promise<MessageModel | null> {
    const result = await this.repository.findById(
      findMessageByIdInput.id,
      findMessageByIdInput.fields,
    );
    return result;
  }
}
