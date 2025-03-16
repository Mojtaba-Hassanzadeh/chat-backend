import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import * as argon2 from 'argon2';
import { SigninOutput } from 'src/auth/dto/signin.dto';
import { JwtHelper } from 'src/auth/helper/jwt.helper';
import { UserModel } from 'src/user/model/user.model';
import { SigninWithOtpQuery } from './signin-with-otp.query';
import { FindOneUserQuery } from 'src/user/query/find-one-user/find-one-user.query';

@QueryHandler(SigninWithOtpQuery)
export class SigninWithOtpHandler implements IQueryHandler<SigninWithOtpQuery> {
  constructor(
    private readonly jwtHelper: JwtHelper,
    private readonly queryBus: QueryBus,
  ) {}

  async execute({ phone, email }: SigninWithOtpQuery): Promise<SigninOutput> {
    let user: UserModel;
    if (phone) {
      user = await this.queryBus.execute(new FindOneUserQuery({ phone }));
      if (!user) throw new NotFoundException('NO_ACCOUNT_WITH_THIS_NUMBER');
    } else if (email) {
      user = await this.queryBus.execute(new FindOneUserQuery({ email }));
      if (!user) throw new NotFoundException('NO_ACCOUNT_WITH_THIS_EMAIL');
    }

    const { accessToken, refreshToken } = await this.jwtHelper.getTokens(
      user.getId(),
      user.getPhone(),
    );

    const hashedRefreshToken = await argon2.hash(refreshToken);

    const userRefreshToken = user.getRefreshTokens();

    userRefreshToken.push(hashedRefreshToken);

    await this.jwtHelper.updateUserRefreshToken(user.getId(), userRefreshToken);
    return {
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
