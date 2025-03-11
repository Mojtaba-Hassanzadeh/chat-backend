import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserQuery } from '../dtos/user.dto';
import { INITIAL_RESPONSE } from 'common/constants/initial-response.constant';
import {
  FindManyUserOutput,
  FindUserByEmailInput,
  FindUserByIdInput,
  FindUserByPhoneAndEmailInput,
  FindUserByPhoneInput,
  FindUserOutput,
  FindUsersByIdsInput,
  FindUsersByRoleInput,
} from '../dtos/find-user.dto';
import { PanelGuard } from 'src/auth/guards/panel.guard';
import { SearchUserOutput, SearchUserInput } from '../dtos/search-user.dto';
import { UserPermission } from '../permission/user-permission';
import { FindUserByEmailUseCase } from '../usecases/find-user-by-email.use-case';
import { FindUserByIdUseCase } from '../usecases/find-user-by-id.use-case';
import { FindUserByPhoneUseCase } from '../usecases/find-user-by-phone.use-case';
import { FindUsersByIdsUseCase } from '../usecases/find-users-by-ids.use-case';
import { FindUsersByRoleUseCase } from '../usecases/find-users-by-role.use-case';
import { SearchUserUseCase } from '../usecases/search-user.use-case';
import { FindUserByPhoneOrEmailAndIsVerifiedUseCase } from '../usecases/find-user-by-phone-or-email-and-is-verified.use-case';

@Resolver(() => UserQuery)
export class UserQueryResolver {
  constructor(
    private readonly searchUserUseCase: SearchUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUserByIdsUseCase: FindUsersByIdsUseCase,
    private readonly findUserByPhoneUseCase: FindUserByPhoneUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly findUserByPhoneOrEmailAndIsVerifiedUseCase: FindUserByPhoneOrEmailAndIsVerifiedUseCase,
    private readonly findUsersByRoleUseCase: FindUsersByRoleUseCase,
  ) {}

  @Query(() => UserQuery)
  async user() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindUserOutput)
  async findUserById(
    @Args('input') input: FindUserByIdInput,
  ): Promise<FindUserOutput> {
    return this.findUserByIdUseCase.findUserById(input);
  }

  @ResolveField(() => FindManyUserOutput)
  async findUserByIds(
    @Args('input') input: FindUsersByIdsInput,
  ): Promise<FindManyUserOutput> {
    return this.findUserByIdsUseCase.findUsersByIds(input);
  }

  @ResolveField(() => FindUserOutput)
  async findUserByPhone(
    @Args('input') input: FindUserByPhoneInput,
  ): Promise<FindUserOutput> {
    return this.findUserByPhoneUseCase.findUserByPhone(input);
  }

  @ResolveField(() => FindUserOutput)
  async findUserByEmail(
    @Args('input') input: FindUserByEmailInput,
  ): Promise<FindUserOutput> {
    return this.findUserByEmailUseCase.findUserByEmail(input);
  }

  @ResolveField(() => FindUserOutput)
  async findUserByPhoneOrEmailAndIsVerified(
    @Args('input') input: FindUserByPhoneAndEmailInput,
  ): Promise<FindUserOutput> {
    return this.findUserByPhoneOrEmailAndIsVerifiedUseCase.findUserByPhoneOrEmailAndIsVerified(
      input,
    );
  }

  @ResolveField(() => FindManyUserOutput)
  async findUsersByRole(
    @Args('input') input: FindUsersByRoleInput,
  ): Promise<FindManyUserOutput> {
    return this.findUsersByRoleUseCase.findUsersByRole(input);
  }

  @ResolveField(() => SearchUserOutput)
  @PanelGuard<MethodDecorator>(UserPermission.READ)
  async searchUser(
    @Args('input') input: SearchUserInput,
  ): Promise<SearchUserOutput> {
    return this.searchUserUseCase.search(input);
  }
}
