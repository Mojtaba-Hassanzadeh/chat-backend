import { UpdateImageInput } from 'src/image/dto/update-image.dto';

export class UpdateImageCommand {
  constructor(readonly updateImageInput: UpdateImageInput) {}
}
