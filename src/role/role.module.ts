import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleCommandHandlers } from './command';
import { RoleEntity, RoleEntitySchema } from './entity/role.entity';
import { RoleEntityFactory } from './entity/role.factory';
import { RoleHelepr } from './helper/role-helper';
import { RoleModelFactory } from './model/role-model.factory';
import { RoleQueryHandlers } from './query';
import { RoleResolvers } from './resolver';
import RoleDataLoader from './role.loader';
import { RoleRepository } from './role.repository';
import { RoleUseCases } from './use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: RoleEntity.name, schema: RoleEntitySchema },
    ]),
  ],
  providers: [
    ...RoleResolvers,
    ...RoleCommandHandlers,
    ...RoleQueryHandlers,
    ...RoleUseCases,
    RoleDataLoader,
    RoleRepository,
    RoleModelFactory,
    RoleEntityFactory,
    RoleHelepr,
  ],
  exports: [...RoleUseCases, RoleHelepr],
})
@Global()
export class RoleModule {}
