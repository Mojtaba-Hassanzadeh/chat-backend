import { UseGuards } from '@nestjs/common';
import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { INITIAL_RESPONSE } from 'common/constants/initial-response.constant';
import { CoreOutput } from 'common/dtos/output.dto';
import { TUser } from 'src/user/entities/user.entity';
import { GetRefreshToken } from '../decorators/get-refresh-token.decorator';
import { GetUser } from '../decorators/get-user.decorator';
import { AuthMutation } from '../dto/auth.dto';
import { LogoutOutput } from '../dto/logout.dto';
import { SetPasswordInput } from '../dto/pass-recovery.dto';
import { RefreshTokenOutput } from '../dto/refresh-token.dto';
import {
  SendVerificationCodeOutput,
  SendVerificationCodeInput,
} from '../dto/send-verification-code.dto';
import { SignupInput, SignupWithPhoneInput } from '../dto/signup.dto';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { LogoutUseCase } from '../use-case/logout.use-case';
import { PassRecoveryUseCase } from '../use-case/pass-recovery.use-case';
import { RefreshTokenUseCase } from '../use-case/refresh-token.use-case';
import { SendVerificationCodeUseCase } from '../use-case/send-verification-code.use-case';
import { SetPasswordUseCase } from '../use-case/set-user-password.use-case';
import { SignupWithPhoneUseCase } from '../use-case/signup-with-phone.use-case';
import { SignupUseCase } from '../use-case/signup.use-case';

@Resolver(AuthMutation)
export class AuthMutationResolver {
  constructor(
    private readonly signupUseCase: SignupUseCase,
    private readonly signupWithPhoneUseCase: SignupWithPhoneUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly sendVerificationCodeUseCase: SendVerificationCodeUseCase,
    private readonly setPasswordUseCase: SetPasswordUseCase,
    private readonly passRecoveryWithPhoneUseCase: PassRecoveryUseCase,
  ) {}

  @Mutation(() => AuthMutation)
  async auth(): Promise<AuthMutation> {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CoreOutput)
  async signup(@Args('input') signupInput: SignupInput): Promise<CoreOutput> {
    return this.signupUseCase.signup(signupInput);
  }

  @ResolveField(() => CoreOutput)
  async signupWithPhone(
    @Args('input') input: SignupWithPhoneInput,
  ): Promise<CoreOutput> {
    return this.signupWithPhoneUseCase.signupWithPhone(input);
  }

  @UseGuards(RefreshTokenGuard)
  @ResolveField(() => LogoutOutput)
  async logout(
    @GetUser() user: TUser,
    @GetRefreshToken() refreshToken: string,
  ): Promise<LogoutOutput> {
    return this.logoutUseCase.logout(user._id.toString(), refreshToken);
  }

  @UseGuards(RefreshTokenGuard)
  @ResolveField(() => RefreshTokenOutput)
  async refreshTokens(
    @GetUser() user: TUser,
    @GetRefreshToken() refreshToken: string,
  ): Promise<RefreshTokenOutput> {
    const userId = user._id.toString();
    return this.refreshTokenUseCase.refreshTokens(userId, refreshToken);
  }

  @ResolveField(() => CoreOutput)
  async setPassword(
    @Args('input') input: SetPasswordInput,
  ): Promise<CoreOutput> {
    return this.setPasswordUseCase.setPassword(input);
  }

  @ResolveField(() => SendVerificationCodeOutput)
  async sendVerificationCode(
    @Args('input') input: SendVerificationCodeInput,
  ): Promise<SendVerificationCodeOutput> {
    return this.sendVerificationCodeUseCase.sendVerificationCode(input);
  }

  @ResolveField(() => CoreOutput)
  async passRecoveryWithPhone(
    @Args('input') input: SetPasswordInput,
  ): Promise<CoreOutput> {
    return this.passRecoveryWithPhoneUseCase.passRecovery(input);
  }
}
