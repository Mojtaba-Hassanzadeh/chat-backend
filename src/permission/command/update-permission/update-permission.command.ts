import { UpdatePermissionInput } from 'src/permission/dto/update-permission.dto';

export class UpdatePermissionCommand {
  constructor(public readonly updatePermissionInput: UpdatePermissionInput) {}
}
