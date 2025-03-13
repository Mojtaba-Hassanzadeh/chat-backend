import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { INITIAL_RESPONSE } from 'common/constants/initial-response.constant';
import { GraphQLUpload, FileUpload } from 'graphql-upload-minimal';
import { PanelGuard } from 'src/auth/guards/panel.guard';
import { DeleteImageOutput, DeleteImageInput } from '../dto/delete-image.dto';
import { ImageMutation } from '../dto/image.dto';
import { UpdateImageOutput, UpdateImageInput } from '../dto/update-image.dto';
import {
  UploadImageOutput,
  UploadImageInput,
  UploadImagesOutput,
  UploadImageWithUrlInput,
} from '../dto/upload-image.dto';
import { ImagePermission } from '../permission/image-permission';
import { DeleteImageUseCase } from '../use-case/delete-image.use-case';
import { UpdateImageUseCase } from '../use-case/update-image.use-case';
import { UploadImageWithUrlUseCase } from '../use-case/upload-image-with-url.use-case';
import { UploadImageUseCase } from '../use-case/upload-image.use-case';
import { UploadImagesUseCase } from '../use-case/upload-images.use-case';

@Resolver(() => ImageMutation)
export class ImageMutationResolver {
  constructor(
    private readonly uploadImageUseCase: UploadImageUseCase,
    private readonly uploadImagesUseCase: UploadImagesUseCase,
    private readonly updateImageUseCase: UpdateImageUseCase,
    private readonly deleteImageUseCase: DeleteImageUseCase,
    private readonly uploadImageWithUrlUseCase: UploadImageWithUrlUseCase,
  ) {}

  @Mutation(() => ImageMutation)
  async image() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => UploadImageOutput)
  @PanelGuard<MethodDecorator>(ImagePermission.IMAGE_UPLOAD)
  async uploadImage(
    @Args('input', { type: () => UploadImageInput, nullable: true })
    input: UploadImageInput,
    @Args('file', { type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<UploadImageOutput> {
    return this.uploadImageUseCase.uploadImage({ ...input, imageFile: file });
  }

  @ResolveField(() => UploadImagesOutput)
  @PanelGuard<MethodDecorator>(ImagePermission.IMAGE_UPLOAD)
  async uploadImages(
    @Args('files', { type: () => [GraphQLUpload] })
    files: Promise<FileUpload>[],
  ): Promise<UploadImagesOutput> {
    return this.uploadImagesUseCase.uploadImages({ imageFiles: files });
  }

  @ResolveField(() => UploadImageOutput)
  @PanelGuard<MethodDecorator>(ImagePermission.IMAGE_UPLOAD)
  async uploadImageWithUrl(
    @Args('input') input: UploadImageWithUrlInput,
  ): Promise<UploadImageOutput> {
    return this.uploadImageWithUrlUseCase.execute(input);
  }

  @ResolveField(() => UpdateImageOutput)
  @PanelGuard<MethodDecorator>(ImagePermission.UPDATE)
  async updateImage(
    @Args('input') input: UpdateImageInput,
  ): Promise<UpdateImageOutput> {
    return await this.updateImageUseCase.updateImage(input);
  }

  @ResolveField(() => DeleteImageOutput)
  @PanelGuard<MethodDecorator>(ImagePermission.DELETE)
  async deleteImage(
    @Args('input') input: DeleteImageInput,
  ): Promise<DeleteImageOutput> {
    return await this.deleteImageUseCase.deleteImage(input);
  }
}
