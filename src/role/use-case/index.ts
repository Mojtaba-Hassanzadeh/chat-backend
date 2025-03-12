import { BulkDeleteRoleUseCase } from './bulk-delete-role.user-case';
import { CreateRoleUseCase } from './create-role.use-case';
import { DeleteRoleUseCase } from './delete-role.use-case';
import { FindRoleByIdUseCase } from './find-role-by-id.use-case';
import { FindRoleByIdsUseCase } from './find-role-by-ids.use-case';
import { FindRoleByNameUseCase } from './find-role-by-name.use-case';
import { SearchRoleUseCase } from './search-role.use-case';
import { UpdateRoleUseCase } from './update-role.use-case';

export const RoleUseCases = [
  CreateRoleUseCase,
  UpdateRoleUseCase,
  DeleteRoleUseCase,
  SearchRoleUseCase,
  FindRoleByIdUseCase,
  FindRoleByIdsUseCase,
  FindRoleByNameUseCase,
  BulkDeleteRoleUseCase,
];
