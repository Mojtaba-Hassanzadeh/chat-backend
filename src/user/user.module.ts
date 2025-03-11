import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entities/user.entity';
import { UserCommandHandlers } from './commands';
import { UserQueryHandlers } from './queries';
import { UserUsecases } from './usecases';
import { UserRepository } from './user.repository';
import { UserEntityFactory } from './entities/user.factory';
import { UserModelFactory } from './models/user-model.factory';
import { UserResolvers } from './resolvers';
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
