import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByEmailAndIsVerifiedQuery } from './find-user-by-email-and-is-verified.query';
import { UserModel } from 'src/user/model/user.model';
import { UserRepository } from 'src/user/user.repository';

@QueryHandler(FindUserByEmailAndIsVerifiedQuery)
export class FindUserByEmailAndIsVerifiedHandler
  implements IQueryHandler<FindUserByEmailAndIsVerifiedQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    email,
    isPasswordSelected,
  }: FindUserByEmailAndIsVerifiedQuery): Promise<UserModel | null> {
    const user = await this.userRepository.findByEmailAndIsVerified(
      { email },
      isPasswordSelected,
    );
    return user;
  }
}
