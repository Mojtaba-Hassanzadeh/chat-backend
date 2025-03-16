import { FindUserByIdInput } from 'src/user/dto/find-user.dto';

export class FindUserByIdQuery {
  constructor(readonly findUserByIdInput: FindUserByIdInput) {}
}
