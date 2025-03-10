import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PermissionEntity } from '../entity/permission.entity';
import PermissionDataLoader from '../persmission.loader';
import { SearchPermissionUseCase } from '../use-case/search-permission.use-case';

const REVIEW_LIMIT = 100;
const REVIEW_INDEX = 1;

@Resolver(() => PermissionEntity)
export class PermissionResolver {
  constructor(
    private readonly loader: PermissionDataLoader,
    private readonly searchPermissionUseCase: SearchPermissionUseCase,
  ) {}

  @ResolveField(() => PermissionEntity, { name: 'parent', nullable: true })
  async result(@Parent() permission: PermissionEntity) {
    const parentId = permission.parent;
    if (parentId == null) return null;
    return this.loader.batchPermissionParent.load(parentId);
  }

  @ResolveField(() => [PermissionEntity], { name: 'childs', nullable: true })
  async childs(@Parent() permission: PermissionEntity) {
    const permId = permission._id;
    const { results } = await this.searchPermissionUseCase.search({
      parent: permId.toHexString(),
      page: REVIEW_INDEX,
      count: REVIEW_LIMIT,
    });
    return results;
  }
}
