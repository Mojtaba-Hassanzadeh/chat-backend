import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserQuery } from '../dtos/user.dto';
import { INITIAL_RESPONSE } from 'common/constants/initial-response.constant';
import { FindUserOutput } from '../dtos/find-user.dto';
import { CoreOutput } from 'common/dtos/output.dto';

@Resolver(() => UserQuery)
export class UserQueryResolver {
  constructor() {}

  @Query(() => UserQuery)
  async user() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindUserOutput)
  async findUserById(): Promise<CoreOutput> {
    return { success: true };
  }
}
