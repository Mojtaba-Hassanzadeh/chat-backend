import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entities/user.entity';
import { UserCommandHandlers } from './command';
import { UserQueryHandlers } from './query';
import { UserUsecases } from './usecase';
import { UserRepository } from './user.repository';
import { UserEntityFactory } from './entities/user.factory';
import { UserModelFactory } from './model/user-model.factory';
import { UserResolvers } from './resolver';
import { MailModule } from 'src/email/mail.module';
import { SmsModule } from 'src/sms/sms.module';
import { UserEventHandlers } from './event';
import UserDataLoader from './user.loader';
import { UserHelper } from './helper/user-helper';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    SmsModule,
    MailModule,
  ],
  providers: [
    ...UserCommandHandlers,
    ...UserQueryHandlers,
    ...UserUsecases,
    ...UserResolvers,
    ...UserEventHandlers,
    UserRepository,
    UserEntityFactory,
    UserModelFactory,
    UserDataLoader,
    UserHelper,
  ],
  exports: [...UserUsecases],
})
@Global()
export class UserModule {}
