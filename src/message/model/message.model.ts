import { AggregateRoot } from '@nestjs/cqrs';
import { MessageModelDto } from '../dto/message-model.dto';
import { MessageStatusType } from '../enum/message-status.enum';

export class MessageModel extends AggregateRoot {
  constructor(private readonly userModelDto: MessageModelDto) {
    super();
  }

  getId(): string {
    return this.userModelDto._id;
  }

  getSender(): string {
    return this.userModelDto.sender;
  }

  getRecipiente(): string {
    return this.userModelDto.recipient;
  }

  getContent(): string {
    return this.userModelDto.content;
  }

  getTimestamp(): string {
    return this.userModelDto.timestamp;
  }

  getStatus(): MessageStatusType {
    return this.userModelDto.status;
  }
}
