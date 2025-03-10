import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  SearchPermissionInput,
  SearchPermissionOutput,
} from '../dto/search-permission.dto';
import { SearchPermissionQuery } from '../query/search-permission/search-permission.query';

@Injectable()
export class SearchPermissionUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async search(
    searchPermissionInput: SearchPermissionInput,
  ): Promise<SearchPermissionOutput> {
    try {
      const {
        results,
        success,
        totalCount,
        totalPages,
      }: SearchPermissionOutput = await this.queryBus.execute(
        new SearchPermissionQuery(searchPermissionInput),
      );

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
