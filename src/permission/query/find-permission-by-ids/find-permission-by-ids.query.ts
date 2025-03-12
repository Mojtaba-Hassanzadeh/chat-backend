import { FindPermissionByIdsInput } from 'src/permission/dto/find-permission.dto';

export class FindPermissionByIdsQuery {
  constructor(readonly findPermissionByIdsInput: FindPermissionByIdsInput) {}
}
