import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ImageEntity } from '../../entity/image.entity';
import { ImageRepository } from '../../image.repository';
import { InsertManyImagesCommand } from './insert-many-images.command';

@CommandHandler(InsertManyImagesCommand)
export class InsertManyImagesHandler
  implements ICommandHandler<InsertManyImagesCommand>
{
  constructor(private readonly repository: ImageRepository) {}

  async execute({
    createImageInputs,
  }: InsertManyImagesCommand): Promise<ImageEntity[]> {
    return await this.repository.insertMany(createImageInputs);
  }
}
