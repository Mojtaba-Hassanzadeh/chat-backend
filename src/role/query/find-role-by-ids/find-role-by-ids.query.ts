import { FindRoleByIdsInput } from 'src/role/dto/find-role.dto';

export class FindRoleByIdsQuery {
  constructor(readonly findRoleByIdsInput: FindRoleByIdsInput) {}
}
