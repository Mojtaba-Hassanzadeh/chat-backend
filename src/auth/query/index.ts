import { GetImageTokenHandler } from './get-image-token/get-image-token.handler';
import { SigninWithOtpHandler } from './signin-with-otp/signin-with-otp.handler';

export const AuthQueryHandlers = [SigninWithOtpHandler, GetImageTokenHandler];
