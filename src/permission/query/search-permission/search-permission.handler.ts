import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchPermissionOutput } from 'src/permission/dto/search-permission.dto';
import { PermissionRepository } from 'src/permission/permission.repository';
import { SearchPermissionQuery } from './search-permission.query';

@QueryHandler(SearchPermissionQuery)
export class SearchPermissionHanler
  implements IQueryHandler<SearchPermissionQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute({
    searchPermissionInput,
  }: SearchPermissionQuery): Promise<SearchPermissionOutput> {
    const result = await this.permissionRepository.search(
      searchPermissionInput,
    );
    return result;
  }
}
