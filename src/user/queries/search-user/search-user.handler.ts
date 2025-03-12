import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchUserQuery } from './search-user.query';
import { UserRepository } from 'src/user/user.repository';
import { SearchUserOutput } from 'src/user/dtos/search-user.dto';

@QueryHandler(SearchUserQuery)
export class SearchUserHandler implements IQueryHandler<SearchUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({
    searchUserInput,
  }: SearchUserQuery): Promise<SearchUserOutput> {
    const result = this.userRepository.search(searchUserInput);
    return result;
  }
}
