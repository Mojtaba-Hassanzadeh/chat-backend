import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RefreshTokenOutput } from '../dto/refresh-token.dto';
import { JwtHelper } from '../helper/jwt.helper';

@Injectable()
export class RefreshTokenUseCase {
  constructor(private jwtHelper: JwtHelper) {}

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<RefreshTokenOutput> {
    try {
      const tokens = await this.jwtHelper.refreshTokens(userId, refreshToken);
      return {
        success: true,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
