import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ImageHelper } from '../helper/image.helper';
import { DeleteImageInput, DeleteImageOutput } from '../dto/delete-image.dto';
import { DeleteImageCommand } from '../command/delete-image/delete-image.command';

@Injectable()
export class DeleteImageUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly imageHelper: ImageHelper,
  ) {}

  async deleteImage(input: DeleteImageInput): Promise<DeleteImageOutput> {
    try {
      await this.imageHelper.validateImageId(input.id);
      await this.commandBus.execute(new DeleteImageCommand(input));

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
