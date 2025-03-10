import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { INITIAL_RESPONSE } from 'common/constants/initial-response.constant';
import { PanelGuard } from 'src/auth/guards/panel.guard';
import {
  FindPermissionOutput,
  FindPermissionByIdInput,
  FindManyPermissionsOutput,
  FindPermissionByIdsInput,
} from '../dto/find-permission.dto';
import { PermissionQuery } from '../dto/permission.dto';
import {
  SearchPermissionOutput,
  SearchPermissionInput,
} from '../dto/search-permission.dto';
import { PermissionPerms } from '../permission/permission-permit';
import { FindPermissionByIdUseCase } from '../use-case/find-permission-by-id.use-case';
import { FindPermissionByIdsUseCase } from '../use-case/find-permission-by-ids.use-case';
import { SearchPermissionUseCase } from '../use-case/search-permission.use-case';

@Resolver(() => PermissionQuery)
export class PermissionQueryResolver {
  constructor(
    private readonly searchPermissionUseCase: SearchPermissionUseCase,
    private readonly findPermissionByIdUseCase: FindPermissionByIdUseCase,
    private readonly findPermissionByIdsUseCase: FindPermissionByIdsUseCase,
  ) {}

  @Query(() => PermissionQuery)
  async permission() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindPermissionOutput)
  @PanelGuard<MethodDecorator>(PermissionPerms.READ)
  async findPermissionById(
    @Args('input') input: FindPermissionByIdInput,
  ): Promise<FindPermissionOutput> {
    return this.findPermissionByIdUseCase.findPermissionById(input);
  }

  @ResolveField(() => FindManyPermissionsOutput)
  @PanelGuard<MethodDecorator>(PermissionPerms.READ)
  async findPermissionByIds(
    @Args('input') input: FindPermissionByIdsInput,
  ): Promise<FindManyPermissionsOutput> {
    return this.findPermissionByIdsUseCase.findPermissionByIds(input);
  }

  @ResolveField(() => SearchPermissionOutput)
  @PanelGuard<MethodDecorator>(PermissionPerms.READ)
  async searchPermissions(
    @Args('input') input: SearchPermissionInput,
  ): Promise<SearchPermissionOutput> {
    return this.searchPermissionUseCase.search(input);
  }
}
