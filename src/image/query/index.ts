import { FindImageByIdHandler } from './find-image-by-id/find-image-by-id.handler';
import { FindImageByIdsHandler } from './find-image-by-ids/find-image-by-ids.handler';
import { SearchImageHandler } from './search-image/search-image.handler';

export const ImageQueryHandlers = [
  SearchImageHandler,
  FindImageByIdHandler,
  FindImageByIdsHandler,
];
