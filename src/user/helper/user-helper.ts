import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindUserByIdQuery } from '../queries/find-user-by-id/find-user-by-id.query';
import { UserModel } from '../models/user.model';
import { FileUpload } from 'graphql-upload-minimal';
import sharp from 'sharp';

@Injectable()
export class UserHelper {
  constructor(private readonly queryBus: QueryBus) {}

  async validateUserId(id: string) {
    const user: UserModel = await this.queryBus.execute(
      new FindUserByIdQuery({ id }),
    );
    if (!user) {
      throw new NotFoundException('USER_ID_IS_NOT_CORRECT');
    }
  }

  async validateImageSize(input: FileUpload) {
    try {
      const file = await input;
      const stream = file.createReadStream();
      const sharpPipe = sharp();
      stream.pipe(sharpPipe);
      const metadata = await sharpPipe.metadata();
      if (!metadata.size) {
        throw new BadRequestException('image size is unknown');
      }
      if (metadata.size > Number(process.env.MAX_IMAGE_SIZE)) {
        throw new BadRequestException('image size is big');
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
