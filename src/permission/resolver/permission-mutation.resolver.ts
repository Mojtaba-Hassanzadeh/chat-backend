import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { INITIAL_RESPONSE } from 'common/constants/initial-response.constant';
import { PanelGuard } from 'src/auth/guards/panel.guard';
import {
  CreatePermissionOutput,
  CreatePermissionInput,
} from '../dto/create-permission.dto';
import {
  DeletePermissionOutput,
  DeletePermissionInput,
  BulkDeletePermissionInput,
} from '../dto/delete-permission.dto';
import { PermissionMutation } from '../dto/permission.dto';
import {
  UpdatePermissionOutput,
  UpdatePermissionInput,
} from '../dto/update-permission.dto';
import { PermissionPerms } from '../permission/permission-permit';
import { BulkDeletePermissionUseCase } from '../use-case/bulk-delete-permission.use-case';
import { CreatePermissionUseCase } from '../use-case/create-permission.use-case';
import { DeletePermissionUseCase } from '../use-case/delete-permission.use-case';
import { UpdatePermissionUseCase } from '../use-case/update-permission.use-case';

@Resolver(() => PermissionMutation)
export class PermissionMutationResolver {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly updatePermissionUseCase: UpdatePermissionUseCase,
    private readonly deletePermissionUseCase: DeletePermissionUseCase,
    private readonly bulkeletePermissionUseCase: BulkDeletePermissionUseCase,
  ) {}

  @Mutation(() => PermissionMutation)
  async permission() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreatePermissionOutput)
  @PanelGuard<MethodDecorator>(PermissionPerms.CREATE)
  async createPermission(
    @Args('input') input: CreatePermissionInput,
  ): Promise<CreatePermissionOutput> {
    return this.createPermissionUseCase.createPermission(input);
  }

  @ResolveField(() => UpdatePermissionOutput)
  @PanelGuard<MethodDecorator>(PermissionPerms.UPDATE)
  async updatePermission(
    @Args('input') input: UpdatePermissionInput,
  ): Promise<UpdatePermissionOutput> {
    return this.updatePermissionUseCase.updatePermission(input);
  }

  @ResolveField(() => DeletePermissionOutput)
  @PanelGuard<MethodDecorator>(PermissionPerms.DELETE)
  async deletePermission(
    @Args('input') input: DeletePermissionInput,
  ): Promise<DeletePermissionOutput> {
    return this.deletePermissionUseCase.deletePermission(input);
  }

  @ResolveField(() => DeletePermissionOutput)
  @PanelGuard<MethodDecorator>(PermissionPerms.DELETE)
  async bulkDeletePermission(
    @Args('input') input: BulkDeletePermissionInput,
  ): Promise<DeletePermissionOutput> {
    return this.bulkeletePermissionUseCase.bulkDeletePermission(input);
  }
}
