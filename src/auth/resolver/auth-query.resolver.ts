import { UseGuards } from '@nestjs/common';
import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { INITIAL_RESPONSE } from 'common/constants/initial-response.constant';
import { CoreOutput } from 'common/dtos/output.dto';
import { TUser } from 'src/user/entities/user.entity';
import { GetUser } from '../decorators/get-user.decorator';
import { AuthQuery } from '../dto/auth.dto';
import { GetImageTokenOutput } from '../dto/get-image-token.dto';
import { GetProfileOutput } from '../dto/get-profile.dto';
import { ValidateVerificationCodeInput } from '../dto/pass-recovery.dto';
import {
  SigninOutput,
  SigninInput,
  SigninWitOtpInput,
} from '../dto/signin.dto';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { PanelGuard } from '../guards/panel.guard';
import { ImageAccessTokenPermission } from '../permission/image-access.permission';
import { GetImageTokenUseCase } from '../use-case/get-image-token.use-case';
import { GetProfileUseCase } from '../use-case/get-profile.use-case';
import { SigninWithOtpUseCase } from '../use-case/signin-with-otp.use-case';
import { SigninUseCase } from '../use-case/signin.use-case';
import { ValidateVerificationCodeUseCase } from '../use-case/validate-verification-code.use-case';

@Resolver(AuthQuery)
export class AuthQueryResolver {
  constructor(
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly singinUseCase: SigninUseCase,
    private readonly signinWithOtpUseCase: SigninWithOtpUseCase,
    private readonly validateVerificationCodeUseCase: ValidateVerificationCodeUseCase,
    private readonly getImageTokenUseCase: GetImageTokenUseCase,
  ) {}

  @Query(() => AuthQuery)
  async auth(): Promise<AuthQuery> {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => SigninOutput)
  async signin(@Args('input') input: SigninInput): Promise<SigninOutput> {
    return this.singinUseCase.signin(input);
  }

  @ResolveField(() => SigninOutput)
  async signinWithOtp(
    @Args('input') input: SigninWitOtpInput,
  ): Promise<SigninOutput> {
    return this.signinWithOtpUseCase.signinWithOtp(input);
  }

  @UseGuards(AccessTokenGuard)
  @ResolveField(() => GetProfileOutput)
  async getProfile(@GetUser() user: TUser): Promise<GetProfileOutput> {
    if (!user) return null;
    return this.getProfileUseCase.getProfile({ id: user._id.toString() });
  }

  @ResolveField(() => CoreOutput)
  async validateVerificationCode(
    @Args('input') input: ValidateVerificationCodeInput,
  ): Promise<CoreOutput> {
    return this.validateVerificationCodeUseCase.validateVerificationCode(input);
  }

  @ResolveField(() => GetImageTokenOutput)
  @PanelGuard<MethodDecorator>(ImageAccessTokenPermission.MAIN)
  async getImageAccessToken(
    @GetUser() user: TUser,
  ): Promise<GetImageTokenOutput> {
    if (!user) return null;
    return this.getImageTokenUseCase.getImageToken({
      userId: user._id.toString(),
    });
  }
}
