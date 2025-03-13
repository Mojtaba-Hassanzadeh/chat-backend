import { InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ImageHelper } from 'src/image/helper/image.helper';
import { ImageRepository } from 'src/image/image.repository';
import { DeleteImageCommand } from './delete-image.command';

@CommandHandler(DeleteImageCommand)
export class DeleteImageHandler implements ICommandHandler<DeleteImageCommand> {
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly imageHelper: ImageHelper,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}
  async execute({ deleteImageInput }: DeleteImageCommand) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.imageRepository.delete(deleteImageInput.id);
      await this.imageHelper.deleteImageFromLocal(deleteImageInput.id);

      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(error);
    }
  }
}
