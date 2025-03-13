import { DeleteImageInput } from 'src/image/dto/delete-image.dto';

export class DeleteImageCommand {
  constructor(readonly deleteImageInput: DeleteImageInput) {}
}
