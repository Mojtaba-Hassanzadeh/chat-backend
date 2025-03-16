import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByIdQuery } from './find-user-by-id.query';
import { UserRepository } from 'src/user/user.repository';
import { UserModel } from 'src/user/model/user.model';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(private readonly repository: UserRepository) {}
  async execute({
    findUserByIdInput,
  }: FindUserByIdQuery): Promise<UserModel | null> {
    const result = await this.repository.findById(
      findUserByIdInput.id,
      findUserByIdInput.fields,
    );
    return result;
  }
}
