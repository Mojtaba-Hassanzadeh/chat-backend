import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import sharp from 'sharp';
import { ServeImageInputDto } from '../dto/serve-image.dto';
import {
  createdCachedImagesDirectory,
  getImageDirectory,
} from 'common/utils/directories.util';
import { isNullOrUndefined } from 'util';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ServeImageUseCase {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async serveImage({
    id,
    width,
    quality: inputQuality,
    response,
  }: ServeImageInputDto) {
    try {
      const MAXIMUM_WIDTH = 1920;
      const DEFAULT_QUALITY = 100;

      const directory = getImageDirectory(id);
      const imagePath = `${directory}/${id}.webp`;

      // Check if image exists
      if (!fs.existsSync(imagePath)) {
        return false; // Image not found
      }

      const isOriginal =
        isNullOrUndefined(width) &&
        (isNullOrUndefined(inputQuality) || inputQuality >= 100);

      // Serve original image
      if (isOriginal) {
        response.sendFile(imagePath, (err) => {
          if (err) {
            console.error('Error sending original file:', err);
            if (!response.headersSent) {
              response.status(500).send('Error serving image');
            }
          }
        });
        return true;
      }

      const quality =
        inputQuality && inputQuality > 0 && inputQuality <= DEFAULT_QUALITY
          ? inputQuality
          : DEFAULT_QUALITY;

      const cacheKey = `${id}_${width}_${quality}`;
      const cachedImagePath: string | undefined =
        await this.cacheManager.get(cacheKey);

      // Serve cached image if it exists
      if (cachedImagePath && fs.existsSync(cachedImagePath)) {
        response.sendFile(cachedImagePath, (err) => {
          if (err) {
            console.error('Error sending cached file:', err);
            if (!response.headersSent) {
              response.status(500).send('Error serving image');
            }
          }
        });
        return true;
      }

      // Transform image
      const file = fs.createReadStream(imagePath);
      const convertedImage = sharp()
        .resize(width > MAXIMUM_WIDTH ? MAXIMUM_WIDTH : width)
        .toFormat('webp', { quality });

      file.on('error', (err) => {
        console.error('Error reading file:', err);
        if (!response.headersSent) {
          response.status(500).send('Error serving image');
        }
      });

      convertedImage.on('error', (err) => {
        console.error('Error processing image:', err);
        if (!response.headersSent) {
          response.status(500).send('Error serving image');
        }
      });

      file.pipe(convertedImage).pipe(response);

      const cachePath = `${createdCachedImagesDirectory()}/${cacheKey}.webp`;
      const cacheFile = fs.createWriteStream(cachePath);
      convertedImage.pipe(cacheFile);

      await new Promise((resolve, reject) => {
        cacheFile.on('finish', resolve as any);
        cacheFile.on('error', reject);
      });

      await this.cacheManager.set(cacheKey, cachePath);

      return true;
    } catch (error) {
      console.error('Error serving image:', error);
      if (!response.headersSent) {
        response.status(500).send('Error serving image');
      }
      return false;
    }
  }
}
