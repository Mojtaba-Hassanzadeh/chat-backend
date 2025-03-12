import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class GetImageTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-image-cdn',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_IMAGE_CDN_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const imageAccessToken = req
      .get('Authorization')
      .replace('Bearer', '')
      .trim();

    return { ...payload, imageAccessToken };
  }
}
