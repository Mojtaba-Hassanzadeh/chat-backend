import { DeleteRoleInput } from 'src/role/dto/delete-role.dto';

export class DeleteRoleCommand {
  constructor(public readonly deleteRoleInput: DeleteRoleInput) {}
}
