import { CreateImageInput } from 'src/image/dto/create-image.dto';

export class CreateImageCommand {
  constructor(readonly createImageInput: CreateImageInput) {}
}
