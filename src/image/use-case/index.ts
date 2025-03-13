import { DeleteImageUseCase } from './delete-image.use-case';
import { FindImageByIdUseCase } from './find-image-by-id.use-case';
import { FindImageByIdsUseCase } from './find-image-by-ids.use-case';
import { SearchImageUseCase } from './search-image.use-case';
import { ServeImageUseCase } from './serve-image.use-case';
import { UpdateImageUseCase } from './update-image.use-case';
import { UploadImageWithUrlUseCase } from './upload-image-with-url.use-case';
import { UploadImageUseCase } from './upload-image.use-case';
import { UploadImagesUseCase } from './upload-images.use-case';

export const ImageUseCases = [
  SearchImageUseCase,
  UploadImageUseCase,
  UploadImagesUseCase,
  UploadImageWithUrlUseCase,
  UpdateImageUseCase,
  DeleteImageUseCase,
  ServeImageUseCase,
  FindImageByIdUseCase,
  FindImageByIdsUseCase,
];
