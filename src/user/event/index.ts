import { SendEmailEventHandler } from './send-email-event/send-otp-with-email.handler';
import { SendSmsEventHandler } from './send-sms-event/send-otp-with-sms.handler';

export const UserEventHandlers = [SendSmsEventHandler, SendEmailEventHandler];
