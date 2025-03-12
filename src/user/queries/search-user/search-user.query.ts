import { SearchUserInput } from 'src/user/dtos/search-user.dto';

export class SearchUserQuery {
  constructor(readonly searchUserInput: SearchUserInput) {}
}
