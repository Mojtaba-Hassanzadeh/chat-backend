import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ImageHelper } from '../helper/image.helper';
import { UpdateImageInput, UpdateImageOutput } from '../dto/update-image.dto';
import { UpdateImageCommand } from '../command/update-image/update-image.command';

@Injectable()
export class UpdateImageUseCase {
  constructor(
    private readonly imageHelper: ImageHelper,
    private readonly commandBus: CommandBus,
  ) {}

  async updateImage(input: UpdateImageInput): Promise<UpdateImageOutput> {
    try {
      await this.imageHelper.validateImageId(input.id);

      await this.commandBus.execute(new UpdateImageCommand(input));

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
