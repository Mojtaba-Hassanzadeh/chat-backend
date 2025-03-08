import { FindOneUserHandler } from './find-one-user/find-one-user.handler';
import { FindUserByIdHandler } from './find-user-by-id/find-user-by-id.handler';

export const UserQueryHandlers = [FindUserByIdHandler, FindOneUserHandler];
