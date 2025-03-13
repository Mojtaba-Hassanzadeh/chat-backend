import { ObjectId } from 'mongodb';
import { ImageEntity } from './image.entity';
import { ImageModel } from '../model/image.model';
import { ModelEntityFactory } from 'common/repositories/model-entity';

export class ImageEntityFactory
  implements ModelEntityFactory<ImageEntity, ImageModel>
{
  create(model: ImageModel): ImageEntity {
    throw new Error('Method not implemented.');
  }

  createFromModel(image: ImageModel): ImageEntity | null {
    if (!image) return null;
    return {
      _id: new ObjectId(image.getId()),
      alt: image.getAlt(),
      filename: image.getFilename(),
      width: image.getWidth(),
      height: image.getHeight(),
      preview: image.getPreview(),
    };
  }
  createFromEntity(imageEntity: ImageEntity): ImageModel {
    if (!imageEntity) return null;
    const { _id, alt, filename, width, height, preview } = imageEntity;
    return new ImageModel({
      _id: _id.toHexString(),
      alt,
      filename,
      width,
      height,
      preview,
    });
  }
}
