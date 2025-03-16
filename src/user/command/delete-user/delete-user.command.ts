import { DeleteUserInput } from 'src/user/dto/delete-user.dto';

export class DeleteUserCommand {
  constructor(public readonly deleteUserInput: DeleteUserInput) {}
}
