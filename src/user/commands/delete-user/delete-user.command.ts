import { DeleteUserInput } from 'src/user/dtos/delete-user.dto';

export class DeleteUserCommand {
  constructor(public readonly deleteUserInput: DeleteUserInput) {}
}
