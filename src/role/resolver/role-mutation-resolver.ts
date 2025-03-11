import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { INITIAL_RESPONSE } from 'common/constants/initial-response.constant';
import { PanelGuard } from 'src/auth/guards/panel.guard';
import { CreateRoleOutput, CreateRoleInput } from '../dto/create-role.dto';
import {
  DeleteRoleOutput,
  DeleteRoleInput,
  BulkDeleteRoleInput,
} from '../dto/delete-role.dto';
import { RoleMutation } from '../dto/role.dto';
import { UpdateRoleOutput, UpdateRoleInput } from '../dto/update-role.dto';
import { RolePermission } from '../permission/role-permission';
import { BulkDeleteRoleUseCase } from '../use-case/bulk-delete-role.user-case';
import { CreateRoleUseCase } from '../use-case/create-role.use-case';
import { DeleteRoleUseCase } from '../use-case/delete-role.use-case';
import { UpdateRoleUseCase } from '../use-case/update-role.use-case';

@Resolver(() => RoleMutation)
export class RoleMutationResolver {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
    private readonly bulkDeleteRoleUseCase: BulkDeleteRoleUseCase,
  ) {}

  @Mutation(() => RoleMutation)
  async role() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateRoleOutput)
  @PanelGuard<MethodDecorator>(RolePermission.CREATE)
  async createRole(
    @Args('input') input: CreateRoleInput,
  ): Promise<CreateRoleOutput> {
    return this.createRoleUseCase.createRole(input);
  }

  @ResolveField(() => UpdateRoleOutput)
  @PanelGuard<MethodDecorator>(RolePermission.UPDATE)
  async updateRole(
    @Args('input') input: UpdateRoleInput,
  ): Promise<UpdateRoleOutput> {
    return this.updateRoleUseCase.updateRole(input);
  }

  @ResolveField(() => DeleteRoleOutput)
  @PanelGuard<MethodDecorator>(RolePermission.DELETE)
  async deleteRole(
    @Args('input') input: DeleteRoleInput,
  ): Promise<DeleteRoleOutput> {
    return this.deleteRoleUseCase.deleteRole(input);
  }

  @ResolveField(() => DeleteRoleOutput)
  @PanelGuard<MethodDecorator>(RolePermission.DELETE)
  async bulkDeleteRole(
    @Args('input') input: BulkDeleteRoleInput,
  ): Promise<DeleteRoleOutput> {
    return this.bulkDeleteRoleUseCase.bulkDeleteRole(input);
  }
}
