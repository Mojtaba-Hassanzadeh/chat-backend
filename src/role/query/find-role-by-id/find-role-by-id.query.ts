import { FindRoleByIdInput } from 'src/role/dto/find-role.dto';

export class FindRoleByIdQuery {
  constructor(readonly findRoleByIdInput: FindRoleByIdInput) {}
}
