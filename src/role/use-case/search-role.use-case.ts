import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { SearchRoleInput, SearchRoleOutput } from '../dto/search-role.dto';
import { SearchRoleQuery } from '../query/search-role/search-role.query';

@Injectable()
export class SearchRoleUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(searchRoleInput: SearchRoleInput): Promise<SearchRoleOutput> {
    try {
      const { results, success, totalCount, totalPages }: SearchRoleOutput =
        await this.queryBus.execute(new SearchRoleQuery(searchRoleInput));

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
