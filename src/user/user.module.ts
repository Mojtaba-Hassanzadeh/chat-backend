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

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [
    ...UserCommandHandlers,
    ...UserQueryHandlers,
    ...UserUsecases,
    ...UserResolvers,
    UserRepository,
    UserEntityFactory,
    UserModelFactory,
  ],
  exports: [...UserUsecases],
})
@Global()
export class UserModule {}
