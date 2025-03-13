import { SearchImagesInput } from 'src/image/dto/search-image.dto';

export class SearchImageQuery {
  constructor(readonly data: SearchImagesInput) {}
}
