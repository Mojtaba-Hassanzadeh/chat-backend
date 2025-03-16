import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneUserQuery } from './find-one-user.query';
import { UserRepository } from 'src/user/user.repository';
import { UserModel } from 'src/user/model/user.model';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {
  constructor(private readonly repository: UserRepository) {}
  async execute({
    filter,
    fields,
    options,
  }: FindOneUserQuery): Promise<UserModel | null> {
    const result = this.repository.findOne(filter, fields, options);
    return result;
  }
}
