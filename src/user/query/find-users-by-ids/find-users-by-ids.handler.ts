import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserModel } from 'src/user/model/user.model';
import { UserRepository } from 'src/user/user.repository';
import { FindUsersByIdsQuery } from './find-users-by-ids.query';

@QueryHandler(FindUsersByIdsQuery)
export class FindUsersbyIdsHandler
  implements IQueryHandler<FindUsersByIdsQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ ids }: FindUsersByIdsQuery): Promise<UserModel[]> {
    const users = await this.userRepository.findManyById(ids);
    return users;
  }
}
