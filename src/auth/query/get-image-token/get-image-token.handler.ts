import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetImageTokenOutput } from 'src/auth/dto/get-image-token.dto';
import { JwtHelper } from 'src/auth/helper/jwt.helper';
import { GetImageTokenQuery } from './get-image-token.query';

@QueryHandler(GetImageTokenQuery)
export class GetImageTokenHandler implements IQueryHandler<GetImageTokenQuery> {
  constructor(private readonly jwtHelper: JwtHelper) {}
  async execute({ userId }: GetImageTokenQuery): Promise<GetImageTokenOutput> {
    const imageAccessToken = await this.jwtHelper.getImageToken(userId);
    return { imageAccessToken, success: true };
  }
}
