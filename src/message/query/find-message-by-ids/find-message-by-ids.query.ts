import { FindMessagesByIdsInput } from '../../dto/find-message.dto';

export class FindMessageByIdsQuery {
  constructor(readonly findMessagesGroupInput: FindMessagesByIdsInput) {}
}
