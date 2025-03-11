import { FindManyUsersHandler } from './find-many-users/find-many-users.handler';
import { FindOneUserHandler } from './find-one-user/find-one-user.handler';
import { FindUserByIdHandler } from './find-user-by-id/find-user-by-id.handler';
import { FindUsersbyIdsHandler } from './find-users-by-ids/find-users-by-ids.handler';
import { SearchUserHandler } from './search-user/search-user.handler';

export const UserQueryHandlers = [
  FindUserByIdHandler,
  FindUsersbyIdsHandler,
  FindOneUserHandler,
  FindManyUsersHandler,
  SearchUserHandler,
];
