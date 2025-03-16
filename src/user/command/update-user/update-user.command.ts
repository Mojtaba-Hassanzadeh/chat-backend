import { UpdateUserInput } from 'src/user/dto/update-user.dto';

export class UpdateUserCommand {
  constructor(public readonly updateUserInput: UpdateUserInput) {}
}
