import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { FindImageByIdsUseCase } from './use-case/find-image-by-ids.use-case';

@Injectable({ scope: Scope.REQUEST })
export default class ImageLoader {
  constructor(private readonly findImageByIdsUseCase: FindImageByIdsUseCase) {}

  public readonly batchImage = new DataLoader(
    async (imageIds: readonly string[]) => {
      const images = await this.findImageByIdsUseCase.findImageByIds(
        imageIds as string[],
      );
      const imagesMap = new Map(
        images.map((image) => [image._id.toString(), image]),
      );
      const finalImages = imageIds.map((imageId) => imagesMap.get(imageId));
      return finalImages;
    },
  );

  public readonly batchImages = new DataLoader(
    async (imageIds: readonly string[][]) => {
      const ids = [...new Set(imageIds.flat())];
      const images = await this.findImageByIdsUseCase.findImageByIds(ids);
      const imagesMap = new Map(
        images.map((image) => [image._id.toString(), image]),
      );

      const data = imageIds.map((imageId) => {
        const finalImages = imageId.map((networkId) =>
          imagesMap.get(networkId),
        );

        return finalImages;
      });

      return data;
    },
  );
}
