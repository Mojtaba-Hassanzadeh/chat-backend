import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionCommandHandlers } from './command';
import {
  PermissionEntity,
  PermissionEntitySchema,
} from './entity/permission.entity';
import { PermissionEntityFactory } from './entity/permission.factory';
import { PermissionHelepr } from './helper/permission-helper';
import { PermissionModelFactory } from './model/permission-model.factory';
import { PermissionRepository } from './permission.repository';
import PermissionDataLoader from './persmission.loader';
import { PermissionQueryHandlers } from './query';
import { PermissionResolvers } from './resolver';
import { PermissionUseCases } from './use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: PermissionEntity.name, schema: PermissionEntitySchema },
    ]),
  ],
  providers: [
    ...PermissionResolvers,
    ...PermissionCommandHandlers,
    ...PermissionQueryHandlers,
    ...PermissionUseCases,
    PermissionRepository,
    PermissionModelFactory,
    PermissionEntityFactory,
    PermissionHelepr,
    PermissionDataLoader,
  ],
  exports: [...PermissionUseCases, PermissionHelepr],
})
@Global()
export class PermissionModule {}
