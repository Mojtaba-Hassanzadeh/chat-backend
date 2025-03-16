import { registerEnumType } from '@nestjs/graphql';

export enum MessageStatusType {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
}

registerEnumType(MessageStatusType, {
  name: 'MessageStatusType',
});
