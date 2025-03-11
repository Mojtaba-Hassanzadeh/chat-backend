import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { SearchUserInput, SearchUserOutput } from '../dtos/search-user.dto';
import { SearchUserQuery } from '../queries/search-user/search-user.query';

@Injectable()
export class SearchUserUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(searchUserInput: SearchUserInput): Promise<SearchUserOutput> {
    try {
      const { results, success, totalCount, totalPages }: SearchUserOutput =
        await this.queryBus.execute(new SearchUserQuery(searchUserInput));

      return {
        success,
        results: results,
        totalCount,
        totalPages,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
