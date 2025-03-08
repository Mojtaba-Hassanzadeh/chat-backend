import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateUserUsecase } from '../usecases/create-user.usecase';
import { UserMutation } from '../dtos/user.dto';
import { INITIAL_RESPONSE } from 'common/constants/initial-response.constant';
import { CreateUserInput, CreateUserOutput } from '../dtos/create-user.dto';

@Resolver(() => UserMutation)
export class UserMutationResolver {
  constructor(private readonly createUserUsecase: CreateUserUsecase) {}

  @Mutation(() => UserMutation)
  async user() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateUserOutput)
  // @PanelGuard<MethodDecorator>(UserPermission.CREATE)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.createUserUsecase.create(input);
  }
}
