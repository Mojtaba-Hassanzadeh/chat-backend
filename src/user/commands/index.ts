import { CreateUserHandler } from './create-user/create-user.handler';
import { DeleteUserHandler } from './delete-user/delete-user.handler';
import { UpdateUserHandler } from './update-user/update-user.handler';

export const UserCommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];
