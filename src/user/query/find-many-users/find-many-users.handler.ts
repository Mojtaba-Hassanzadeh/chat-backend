import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindManyUsersQuery } from './find-many-users.query';
import { UserRepository } from 'src/user/user.repository';
import { UserModel } from 'src/user/model/user.model';

@QueryHandler(FindManyUsersQuery)
export class FindManyUsersHandler implements IQueryHandler<FindManyUsersQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute({
    filter,
    projection,
    options,
  }: FindManyUsersQuery): Promise<UserModel[] | null> {
    const result = await this.repository.findMany(filter, projection, options);
    return result;
  }
}
