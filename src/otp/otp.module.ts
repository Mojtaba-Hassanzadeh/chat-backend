import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { OtpCommandHandlers } from './command';
import { OtpEntity, OtpEntitySchema } from './entity/otp.entity';
import { OtpEntityFactory } from './entity/otp.factory';
import { OtpModelFactory } from './model/otp-model.factory';
import { OtpRepository } from './otp.repository';
import { QueryHandlers } from './query';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: OtpEntity.name, schema: OtpEntitySchema },
    ]),
  ],
  providers: [
    ...OtpCommandHandlers,
    ...QueryHandlers,
    OtpRepository,
    OtpModelFactory,
    OtpEntityFactory,
  ],
})
@Global()
export class OtpModule {}
