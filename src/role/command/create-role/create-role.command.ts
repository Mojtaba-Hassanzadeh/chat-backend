import { CreateRoleInput } from 'src/role/dto/create-role.dto';

export class CreateRoleCommand {
  constructor(public readonly createRoleInput: CreateRoleInput) {}
}
