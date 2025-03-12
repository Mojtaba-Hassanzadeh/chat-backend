import { GetImageTokenUseCase } from './get-image-token.use-case';
import { GetProfileUseCase } from './get-profile.use-case';
import { LogoutUseCase } from './logout.use-case';
import { PassRecoveryUseCase } from './pass-recovery.use-case';
import { RefreshTokenUseCase } from './refresh-token.use-case';
import { SendVerificationCodeUseCase } from './send-verification-code.use-case';
import { SetPasswordUseCase } from './set-user-password.use-case';
import { SigninWithOtpUseCase } from './signin-with-otp.use-case';
import { SigninUseCase } from './signin.use-case';
import { SignupWithPhoneUseCase } from './signup-with-phone.use-case';
import { SignupUseCase } from './signup.use-case';
import { ValidateVerificationCodeUseCase } from './validate-verification-code.use-case';

export const AuthUseCases = [
  SignupUseCase,
  SigninUseCase,
  LogoutUseCase,
  RefreshTokenUseCase,
  SigninWithOtpUseCase,
  GetProfileUseCase,
  PassRecoveryUseCase,
  SignupWithPhoneUseCase,
  ValidateVerificationCodeUseCase,
  SendVerificationCodeUseCase,
  SetPasswordUseCase,
  GetImageTokenUseCase,
];
