import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserCommand } from 'src/user/command/update-user/update-user.command';
import { UserModel } from 'src/user/model/user.model';
import { FindUserByIdQuery } from 'src/user/query/find-user-by-id/find-user-by-id.query';
import * as argon2 from 'argon2';

@Injectable()
export class JwtHelper {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getTokens(userId: string, phone: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          _id: userId,
          phone,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          _id: userId,
          phone,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user: UserModel = await this.queryBus.execute(
      new FindUserByIdQuery({ id: userId }),
    );

    if (!user || !user.getRefreshTokens())
      throw new ForbiddenException('ACCESS_DENIED');

    // let isMatches = false;
    // let index = 0;

    // await Promise.all(
    //   user.getRefreshTokens().map(async (item, i) => {
    //     const refreshTokenMatches = await argon2.verify(item, refreshToken);
    //     if (refreshTokenMatches) {
    //       isMatches = true;
    //       index = i;
    //     }
    //   }),
    // );

    // if (!isMatches) throw new ForbiddenException(ACCESS_DENIED);

    //***************************************************************

    // for (let i = 0; i < user.getRefreshTokens().length; i++) {
    //   try {
    //     const refreshTokenMatches = await argon2.verify(
    //       user.getRefreshTokens()[i],
    //       refreshToken,
    //     );
    //     if (refreshTokenMatches) {
    //       isMatches = true;
    //       index = i;
    //       break; // Exit the loop early if a match is found
    //     }
    //   } catch (error) {
    //     throw new ForbiddenException(ACCESS_DENIED);
    //   }
    // }

    // if (!isMatches) throw new ForbiddenException(ACCESS_DENIED);

    const tokens = await this.getTokens(user.getId(), user.getPhone());

    const userRefreshToken = user.getRefreshTokens();

    const hashedRefreshToken = await argon2.hash(tokens.refreshToken);

    // userRefreshToken[index] = hashedRefreshToken;
    userRefreshToken.push(hashedRefreshToken);

    await this.updateUserRefreshToken(user.getId(), userRefreshToken);
    return {
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async updateUserRefreshToken(userId: string, refreshTokens: string[]) {
    await this.commandBus.execute(
      new UpdateUserCommand({
        id: userId,
        refreshToken: refreshTokens,
      }),
    );
  }

  verifyJwtToken(token: any) {
    return this.jwtService.verify(token);
  }

  async getImageToken(userId: string) {
    return this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.get<string>('JWT_IMAGE_CDN_SECRET'),
        expiresIn: process.env.IMAGE_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    );
  }
}
