import { FindPermissionByIdInput } from 'src/permission/dto/find-permission.dto';

export class FindPermissionByIdQuery {
  constructor(readonly findPermissionByIdInput: FindPermissionByIdInput) {}
}
