import { MessageStatusType } from '../enum/message-status.enum';

export class MessageModelDto {
  _id: string;
  sender: string;
  recipient: string;
  content?: string;
  timestamp: string;
  status: MessageStatusType;
}
