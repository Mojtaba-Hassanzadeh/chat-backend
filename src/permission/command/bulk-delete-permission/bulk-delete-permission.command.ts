import { BulkDeletePermissionInput } from 'src/permission/dto/delete-permission.dto';

export class BulkDeletePermissionCommand {
  constructor(
    public readonly bulkDeletePermissionInput: BulkDeletePermissionInput,
  ) {}
}
