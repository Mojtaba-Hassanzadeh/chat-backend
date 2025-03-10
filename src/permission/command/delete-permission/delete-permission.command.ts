import { DeletePermissionInput } from 'src/permission/dto/delete-permission.dto';

export class DeletePermissionCommand {
  constructor(public readonly deletePermissionInput: DeletePermissionInput) {}
}
