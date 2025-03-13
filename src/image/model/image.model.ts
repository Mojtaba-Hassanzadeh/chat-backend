import { AggregateRoot } from '@nestjs/cqrs';
import { ImageModelDto } from '../dto/image-model.dto';
import { UpdateImageInput } from '../dto/update-image.dto';

export class ImageModel extends AggregateRoot {
  constructor(private readonly imageModelDto: ImageModelDto) {
    super();
  }

  getId(): string {
    return this.imageModelDto._id;
  }

  getAlt(): string | null {
    return this.imageModelDto.alt;
  }

  getFilename(): string {
    return this.imageModelDto.filename;
  }

  getWidth(): number {
    return this.imageModelDto.width;
  }

  getHeight(): number {
    return this.imageModelDto.height;
  }

  getPreview(): string {
    return this.imageModelDto.preview;
  }

  updateImage({ alt }: UpdateImageInput) {
    alt && (this.imageModelDto.alt = alt);
  }
}
