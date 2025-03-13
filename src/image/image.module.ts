import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageCommandHandlers } from './command';
import { ImageEntity, ImageSchema } from './entity/image.entity';
import { ImageEntityFactory } from './entity/image.factory';
import { ImageHelper } from './helper/image.helper';
import { ImageController } from './image.controller';
import { ImageRepository } from './image.repository';
import { ImageQueryHandlers } from './query';
import { ImageResolvers } from './resolver';

import { ImageModelFactory } from './model/image-model.factory';
import { ImageUseCases } from './use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: ImageEntity.name, schema: ImageSchema },
    ]),
    HttpModule,
  ],
  controllers: [ImageController],
  providers: [
    ...ImageCommandHandlers,
    ...ImageQueryHandlers,
    ...ImageUseCases,
    ...ImageResolvers,
    ImageHelper,
    ImageRepository,
    ImageEntityFactory,
    ImageModelFactory,
  ],
  exports: [...ImageUseCases, ImageHelper],
})
export class ImageModule {}
