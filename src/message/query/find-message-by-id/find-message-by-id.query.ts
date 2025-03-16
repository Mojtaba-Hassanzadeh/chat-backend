import { FindMessageByIdInput } from '../../dto/find-message.dto';

export class FindMessageByIdQuery {
  constructor(readonly findMessageByIdInput: FindMessageByIdInput) {}
}
