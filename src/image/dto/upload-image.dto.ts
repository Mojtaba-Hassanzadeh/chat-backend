import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'common/dtos/output.dto';
import { FileUpload } from 'graphql-upload-minimal';
import { ImageEntity } from '../entity/image.entity';
import { IsOptional, IsString } from 'class-validator';

@InputType('UploadImageInputType')
export class UploadImageInput extends PickType(ImageEntity, ['alt']) {
  imageFile: FileUpload;
}

@InputType('UploadImagesInputType')
export class UploadImagesInput {
  imageFiles: Promise<FileUpload>[];
}

@ObjectType()
export class UploadImageOutput extends CoreOutput {
  @Field(() => ImageEntity, { nullable: true })
  @IsOptional()
  image?: ImageEntity;
}

@ObjectType()
export class UploadImagesOutput extends CoreOutput {
  @Field(() => [ImageEntity], { nullable: true })
  @IsOptional()
  images?: ImageEntity[];
}

@InputType()
export class UploadImageWithUrlInput {
  @Field(() => String)
  @IsString()
  url: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  alt?: string;
}
