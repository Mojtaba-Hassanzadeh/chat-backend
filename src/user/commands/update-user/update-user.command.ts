import { UpdateUserInput } from 'src/user/dtos/update-user.dto';

export class UpdateUserCommand {
  constructor(public readonly updateUserInput: UpdateUserInput) {}
}
