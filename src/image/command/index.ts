import { CreateImageHandler } from './create-image/create-image.handler';
import { DeleteImageHandler } from './delete-image/delete-image.handler';
import { InsertManyImagesHandler } from './insert-many-images/insert-many-images.handler';
import { UpdataImageHandler } from './update-image/update-image.handler';

export const ImageCommandHandlers = [
  CreateImageHandler,
  UpdataImageHandler,
  DeleteImageHandler,
  InsertManyImagesHandler,
];
