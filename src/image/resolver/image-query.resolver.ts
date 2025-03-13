import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ImageQuery } from '../dto/image.dto';
import { SearchImageUseCase } from '../use-case/search-image.use-case';
import { FindImageByIdUseCase } from '../use-case/find-image-by-id.use-case';
import { INITIAL_RESPONSE } from 'common/constants/initial-response.constant';
import { FindImageByIdInput, FindImageOutput } from '../dto/find-image.dto';
import { SearchImagesInput, SearchImagesOutput } from '../dto/search-image.dto';

@Resolver(() => ImageQuery)
export class ImageQueryResolver {
  constructor(
    private readonly searchImageUseCase: SearchImageUseCase,
    private readonly findImageUseCase: FindImageByIdUseCase,
  ) {}

  @Query(() => ImageQuery)
  async image() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindImageOutput)
  async findImageById(
    @Args('input') input: FindImageByIdInput,
  ): Promise<FindImageOutput> {
    return this.findImageUseCase.findImageById(input.id);
  }

  @ResolveField(() => SearchImagesOutput)
  async searchImage(
    @Args('input') input: SearchImagesInput,
  ): Promise<SearchImagesOutput> {
    return this.searchImageUseCase.searchImage(input);
  }
}
