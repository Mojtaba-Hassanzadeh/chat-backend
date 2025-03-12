import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { INITIAL_RESPONSE } from 'common/constants/initial-response.constant';
import { PanelGuard } from 'src/auth/guards/panel.guard';
import {
  FindRoleOutput,
  FindRoleByIdInput,
  FindManyRolesOutput,
  FindRoleByIdsInput,
} from '../dto/find-role.dto';
import { RoleQuery } from '../dto/role.dto';
import { SearchRoleOutput, SearchRoleInput } from '../dto/search-role.dto';
import { RolePermission } from '../permission/role-permission';
import { FindRoleByIdUseCase } from '../use-case/find-role-by-id.use-case';
import { FindRoleByIdsUseCase } from '../use-case/find-role-by-ids.use-case';
import { SearchRoleUseCase } from '../use-case/search-role.use-case';

@Resolver(() => RoleQuery)
export class RoleQueryResolver {
  constructor(
    private readonly searchRoleUseCase: SearchRoleUseCase,
    private readonly findRoleByIdUseCase: FindRoleByIdUseCase,
    private readonly findRoleByIdsUseCase: FindRoleByIdsUseCase,
  ) {}

  @Query(() => RoleQuery)
  async role() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindRoleOutput)
  @PanelGuard<MethodDecorator>(RolePermission.READ)
  async findRoleById(
    @Args('input') input: FindRoleByIdInput,
  ): Promise<FindRoleOutput> {
    return this.findRoleByIdUseCase.findRoleByid(input);
  }

  @ResolveField(() => FindManyRolesOutput)
  @PanelGuard<MethodDecorator>(RolePermission.READ)
  async findRoleByIds(
    @Args('input') input: FindRoleByIdsInput,
  ): Promise<FindManyRolesOutput> {
    return this.findRoleByIdsUseCase.findRoleByIds(input);
  }

  @ResolveField(() => SearchRoleOutput)
  @PanelGuard<MethodDecorator>(RolePermission.READ)
  async searchRoles(
    @Args('input') input: SearchRoleInput,
  ): Promise<SearchRoleOutput> {
    return this.searchRoleUseCase.search(input);
  }
}
