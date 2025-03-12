import { BulkDeleteRoleInput } from 'src/role/dto/delete-role.dto';

export class BulkDeleteRoleCommand {
  constructor(public readonly bulkDeleteRoleInput: BulkDeleteRoleInput) {}
}
