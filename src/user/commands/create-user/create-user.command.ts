import { CreateUserInput } from 'src/user/dtos/create-user.dto';

export class CreateUserCommand {
  constructor(public readonly createUserInput: CreateUserInput) {}
}
