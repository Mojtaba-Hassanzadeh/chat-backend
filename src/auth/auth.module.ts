import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/email/mail.module';
import { SmsModule } from 'src/sms/sms.module';
import { UserEntityFactory } from 'src/user/entities/user.factory';
import { JwtHelper } from './helper/jwt.helper';
import { AuthQueryHandlers } from './query';
import { AuthResolvers } from './resolver';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AuthUseCases } from './use-case';

@Module({
  imports: [CqrsModule, JwtModule.register({}), SmsModule, MailModule],
  providers: [
    ...AuthResolvers,
    ...AuthQueryHandlers,
    ...AuthUseCases,
    UserEntityFactory,
    JwtHelper,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
