import { FindUserByIdInput } from 'src/user/dtos/find-user.dto';

export class FindUserByIdQuery {
  constructor(readonly findUserByIdInput: FindUserByIdInput) {}
}
