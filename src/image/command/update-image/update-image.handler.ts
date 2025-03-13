import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateImageCommand } from './update-image.command';
import { ImageRepository } from 'src/image/image.repository';

@CommandHandler(UpdateImageCommand)
export class UpdataImageHandler implements ICommandHandler<UpdateImageCommand> {
  constructor(private readonly imageRepository: ImageRepository) {}
  async execute({ updateImageInput }: UpdateImageCommand) {
    const image = await this.imageRepository.findById(updateImageInput.id);
    image.updateImage(updateImageInput);
    await this.imageRepository.updateImage(image);
  }
}
