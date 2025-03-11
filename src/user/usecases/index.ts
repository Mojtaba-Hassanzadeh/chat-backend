import { CreateUserUsecase } from './create-user.usecase';
import { DeleteUserUseCase } from './delete-user.use-case';
import { FindUserByEmailUseCase } from './find-user-by-email.use-case';
import { FindUserByIdUseCase } from './find-user-by-id.use-case';
import { FindUserByPhoneOrEmailAndIsVerifiedUseCase } from './find-user-by-phone-or-email-and-is-verified.use-case';
import { FindUserByPhoneUseCase } from './find-user-by-phone.use-case';
import { FindUsersByIdsUseCase } from './find-users-by-ids.use-case';
import { FindUsersByRoleUseCase } from './find-users-by-role.use-case';
import { SearchUserUseCase } from './search-user.use-case';
import { UpdateUserByUserUseCase } from './update-by-user.use-case';
import { UpdateUserUseCase } from './update-user.use-case';

export const UserUsecases = [
  CreateUserUsecase,
  UpdateUserUseCase,
  UpdateUserByUserUseCase,
  DeleteUserUseCase,
  SearchUserUseCase,
  FindUserByIdUseCase,
  FindUserByEmailUseCase,
  FindUserByPhoneUseCase,
  FindUserByPhoneOrEmailAndIsVerifiedUseCase,
  FindUsersByRoleUseCase,
  FindUsersByIdsUseCase,
];
