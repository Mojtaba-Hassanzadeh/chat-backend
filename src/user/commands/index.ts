import { CreateUserWithEmailHandler } from './create-user-with-email/create-user-with-email.handler';
import { CreateUserWithPhoneHandler } from './create-user-with-phone/create-user-with-phone.handler';
import { CreateUserHandler } from './create-user/create-user.handler';
import { DeleteUserHandler } from './delete-user/delete-user.handler';
import { RemoveRoleFromUsersHandler } from './remove-role-from-users/remove-role-from-users.handler';
import { UpdateUserHandler } from './update-user/update-user.handler';

export const UserCommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  CreateUserWithPhoneHandler,
  CreateUserWithEmailHandler,
  RemoveRoleFromUsersHandler,
];
