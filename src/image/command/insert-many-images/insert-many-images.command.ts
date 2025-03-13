import { CreateImageInput } from '../../dto/create-image.dto';

export class InsertManyImagesCommand {
  constructor(public readonly createImageInputs: CreateImageInput[]) {}
}
