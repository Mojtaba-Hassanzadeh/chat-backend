import { SearchUserInput } from 'src/user/dto/search-user.dto';

export class SearchUserQuery {
  constructor(readonly searchUserInput: SearchUserInput) {}
}
