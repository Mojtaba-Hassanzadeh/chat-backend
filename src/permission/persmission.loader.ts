import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { FindPermissionByIdsUseCase } from './use-case/find-permission-by-ids.use-case';

@Injectable({ scope: Scope.REQUEST })
export default class PermissionDataLoader {
  constructor(
    private readonly findPermissionByIdsUseCase: FindPermissionByIdsUseCase,
  ) {}

  public readonly batchPermissionParent = new DataLoader(
    async (permissionIds: readonly string[]) => {
      const permission =
        await this.findPermissionByIdsUseCase.findPermissionByIds({
          ids: permissionIds as string[],
        });
      const permissionMap = new Map(
        permission.results.map((perm) => [perm._id.toHexString(), perm]),
      );
      const finalPermission = permissionIds.map((permId) =>
        permissionMap.get(permId),
      );
      return finalPermission;
    },
  );
}
