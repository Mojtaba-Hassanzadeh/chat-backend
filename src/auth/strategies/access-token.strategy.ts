import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { FindUserByIdUseCase } from 'src/user/usecase/find-user-by-id.use-case';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<UserEntity> {
    const { _id } = payload;
    const user = await this.findUserByIdUseCase.findUserById({ id: _id });
    if (!user.result) {
      throw new UnauthorizedException();
    }

    return user.result;
  }
}
