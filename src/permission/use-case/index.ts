import { BulkDeletePermissionUseCase } from './bulk-delete-permission.use-case';
import { CreatePermissionUseCase } from './create-permission.use-case';
import { DeletePermissionUseCase } from './delete-permission.use-case';
import { FindPermissionByIdUseCase } from './find-permission-by-id.use-case';
import { FindPermissionByIdsUseCase } from './find-permission-by-ids.use-case';
import { SearchPermissionUseCase } from './search-permission.use-case';
import { UpdatePermissionUseCase } from './update-permission.use-case';

export const PermissionUseCases = [
  CreatePermissionUseCase,
  UpdatePermissionUseCase,
  DeletePermissionUseCase,
  SearchPermissionUseCase,
  FindPermissionByIdUseCase,
  FindPermissionByIdsUseCase,
  BulkDeletePermissionUseCase,
];
