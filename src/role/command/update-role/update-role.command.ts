import { UpdateRoleInput } from 'src/role/dto/update-role.dto';

export class UpdateRoleCommand {
  constructor(public readonly updateRoleInput: UpdateRoleInput) {}
}
