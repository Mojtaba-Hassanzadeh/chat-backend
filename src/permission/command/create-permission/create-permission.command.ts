import { CreatePermissionInput } from 'src/permission/dto/create-permission.dto';

export class CreatePermissionCommand {
  constructor(public readonly createPermissionInput: CreatePermissionInput) {}
}
