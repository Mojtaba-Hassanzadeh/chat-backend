import { CreateUserInput } from 'src/user/dto/create-user.dto';

export class CreateUserCommand {
  constructor(public readonly createUserInput: CreateUserInput) {}
}
