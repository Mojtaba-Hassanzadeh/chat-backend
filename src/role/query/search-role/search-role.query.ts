import { SearchRoleInput } from 'src/role/dto/search-role.dto';

export class SearchRoleQuery {
  constructor(readonly searchRoleInput: SearchRoleInput) {}
}
