import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ImageModel } from 'src/image/model/image.model';
import { CreateImageCommand } from './create-image.command';
import { ImageModelFactory } from 'src/image/model/image-model.factory';

@CommandHandler(CreateImageCommand)
export class CreateImageHandler implements ICommandHandler<CreateImageCommand> {
  constructor(private readonly imageFactory: ImageModelFactory) {}
  async execute({ createImageInput }: CreateImageCommand): Promise<ImageModel> {
    const image = await this.imageFactory.create(createImageInput);
    return image;
  }
}
