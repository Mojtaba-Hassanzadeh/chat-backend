import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import * as argon2 from 'argon2';
import { UserModel } from 'src/user/model/user.model';
import { SigninInput, SigninOutput } from '../dto/signin.dto';
import { JwtHelper } from '../helper/jwt.helper';
import { FindUserByEmailAndIsVerifiedQuery } from 'src/user/query/find-user-by-email-and-is-verified/find-user-by-email-and-is-verified.query';
import { FindUserByPhoneAndIsVerifiedQuery } from 'src/user/query/find-user-by-phone-and-is-verified/find-user-by-phone-and-is-verified.query';

@Injectable()
export class SigninUseCase {
  private readonly IS_PASSWORD_SELECTED = true;
  constructor(
    private readonly queryBus: QueryBus,
    private readonly jwtHelper: JwtHelper,
  ) {}

  async signin({ phone, email, password }: SigninInput): Promise<SigninOutput> {
    try {
      let user: UserModel;

      if (phone) {
        user = await this.queryBus.execute(
          new FindUserByPhoneAndIsVerifiedQuery(
            phone,
            this.IS_PASSWORD_SELECTED,
          ),
        );
      } else if (email) {
        user = await this.queryBus.execute(
          new FindUserByEmailAndIsVerifiedQuery(
            email,
            this.IS_PASSWORD_SELECTED,
          ),
        );
      }

      if (!user) throw new BadRequestException('USER_NOT_FOUND');

      const isValid = password && (await user.validatePassword(password));
      if (!isValid || !user)
        throw new UnauthorizedException('INCORRECT_PASSWORD');

      const { accessToken, refreshToken } = await this.jwtHelper.getTokens(
        user.getId(),
        user.getPhone(),
      );

      const hashedRefreshToken = await argon2.hash(refreshToken);

      const userRefreshToken = user.getRefreshTokens();

      userRefreshToken.push(hashedRefreshToken);

      await this.jwtHelper.updateUserRefreshToken(
        user.getId(),
        userRefreshToken,
      );
      return {
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
