import { SearchPermissionInput } from 'src/permission/dto/search-permission.dto';

export class SearchPermissionQuery {
  constructor(readonly searchPermissionInput: SearchPermissionInput) {}
}
