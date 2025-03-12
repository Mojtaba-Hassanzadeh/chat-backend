import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetImageTokenInput,
  GetImageTokenOutput,
} from '../dto/get-image-token.dto';
import { GetImageTokenQuery } from '../query/get-image-token/get-image-token.query';

@Injectable()
export class GetImageTokenUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async getImageToken({
    userId,
  }: GetImageTokenInput): Promise<GetImageTokenOutput> {
    return this.queryBus.execute(new GetImageTokenQuery(userId));
  }
}
