import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ServeImageUseCase } from './use-case/serve-image.use-case';
import { UploadImageWithUrlUseCase } from './use-case/upload-image-with-url.use-case';
import { ImagePermission } from './permission/image-permission';
import { PanelGuard } from 'src/auth/guards/panel.guard';
import {
  UploadImageOutput,
  UploadImageWithUrlInput,
} from './dto/upload-image.dto';

@Controller('images')
export class ImageController {
  constructor(
    private readonly serveImageUseCase: ServeImageUseCase,
    private readonly uploadImageWithUrlUseCase: UploadImageWithUrlUseCase,
  ) {}

  @Get(':id')
  @Header('Cache-Control', 'public, max-age=86400, s-maxage=31536000')
  @Header('Content-Type', 'image/webp')
  async serveImage(
    @Res() response: Response,
    @Param('id') id: string,
    @Query('w') w?: number,
    @Query('q') q?: number,
  ) {
    // Call the use case to serve the image
    const result = await this.serveImageUseCase.serveImage({
      id,
      width: w ? +w : w,
      quality: q ? +q : q,
      response,
    });

    // If the result is false or null, return a 404 response
    if (!result) {
      return response.status(404).json({
        message: 'Image not found',
      });
    }
  }

  @Post('download')
  @PanelGuard<MethodDecorator>(ImagePermission.IMAGE_DOWNLOAD)
  async uploadImageWithUrl(
    @Body() input: UploadImageWithUrlInput,
  ): Promise<UploadImageOutput> {
    return this.uploadImageWithUrlUseCase.execute(input);
  }
}
