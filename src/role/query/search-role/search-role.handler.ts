import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchRoleOutput } from 'src/role/dto/search-role.dto';
import { RoleRepository } from 'src/role/role.repository';
import { SearchRoleQuery } from './search-role.query';

@QueryHandler(SearchRoleQuery)
export class SearchRoleHanler implements IQueryHandler<SearchRoleQuery> {
  constructor(private readonly roleRepository: RoleRepository) {}
  async execute({
    searchRoleInput,
  }: SearchRoleQuery): Promise<SearchRoleOutput> {
    const result = await this.roleRepository.search(searchRoleInput);
    return result;
  }
}
