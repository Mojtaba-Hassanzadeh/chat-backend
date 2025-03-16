import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateUserUsecase } from '../usecase/create-user.usecase';
import { UserMutation } from '../dto/user.dto';
import { INITIAL_RESPONSE } from 'common/constants/initial-response.constant';
import { CreateUserInput, CreateUserOutput } from '../dto/create-user.dto';
import { UserPermission } from '../permission/user-permission';
import { PanelGuard } from 'src/auth/guards/panel.guard';
import { UseGuards } from '@nestjs/common';
import { GraphQLUpload, FileUpload } from 'graphql-upload-minimal';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { DeleteUserOutput, DeleteUserInput } from '../dto/delete-user.dto';
import {
  UpdateUserOutput,
  UpdateUserByCeoInput,
  UpdateUserByUserInput,
} from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { DeleteUserUseCase } from '../usecase/delete-user.use-case';
import { UpdateUserByUserUseCase } from '../usecase/update-by-user.use-case';
import { UpdateUserUseCase } from '../usecase/update-user.use-case';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Resolver(() => UserMutation)
export class UserMutationResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUsecase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly updateByUserUseCase: UpdateUserByUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Mutation(() => UserMutation)
  async user() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateUserOutput)
  @PanelGuard<MethodDecorator>(UserPermission.CREATE)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.createUserUseCase.create(input);
  }

  @ResolveField(() => UpdateUserOutput)
  @PanelGuard<MethodDecorator>(UserPermission.UPDATE)
  async updateUser(
    @Args('input') input: UpdateUserByCeoInput,
  ): Promise<UpdateUserOutput> {
    return this.updateUserUseCase.updateUser(input);
  }

  @ResolveField(() => UpdateUserOutput)
  @UseGuards(AccessTokenGuard)
  async updateByUser(
    @GetUser() user: UserEntity,
    @Args('input') input: UpdateUserByUserInput,
    @Args('fileUpload', { type: () => GraphQLUpload, nullable: true })
    fileUpload?: FileUpload,
  ): Promise<UpdateUserOutput> {
    return this.updateByUserUseCase.updateByUser(
      {
        ...input,
        fileUpload: fileUpload,
      },
      user,
    );
  }

  @ResolveField(() => DeleteUserOutput)
  @PanelGuard<MethodDecorator>(UserPermission.DELETE)
  async deleteUser(
    @Args('input') input: DeleteUserInput,
  ): Promise<DeleteUserOutput> {
    return this.deleteUserUseCase.deleteUser(input);
  }
}
