import { FindOtpByEmailHandler } from './find-otp-by-email.query.ts/find-otp-by-email.handler';
import { FindOtpByPhoneHandler } from './find-otp-by-phone/find-otp-by-phone.handler';

export const QueryHandlers = [FindOtpByPhoneHandler, FindOtpByEmailHandler];
