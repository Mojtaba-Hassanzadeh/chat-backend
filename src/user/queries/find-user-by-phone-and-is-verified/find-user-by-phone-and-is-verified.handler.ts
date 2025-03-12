import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindUserByPhoneAndIsVerifiedQuery } from './find-user-by-phone-and-is-verified.query';
import { UserModel } from 'src/user/models/user.model';
import { UserRepository } from 'src/user/user.repository';

@QueryHandler(FindUserByPhoneAndIsVerifiedQuery)
export class FindUserByPhoneAndIsVerifiedHandler
  implements IQueryHandler<FindUserByPhoneAndIsVerifiedQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    phone,
    isPasswordSelected,
  }: FindUserByPhoneAndIsVerifiedQuery): Promise<UserModel | null> {
    const user = await this.userRepository.findByPhoneAndIsVerified(
      { phone },
      isPasswordSelected,
    );
    return user;
  }
}
