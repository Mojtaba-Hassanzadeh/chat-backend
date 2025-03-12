import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SmsUseCases } from './use-case';

@Module({
  imports: [CqrsModule, HttpModule],
  providers: [...SmsUseCases],
  exports: [...SmsUseCases],
})
export class SmsModule {}
