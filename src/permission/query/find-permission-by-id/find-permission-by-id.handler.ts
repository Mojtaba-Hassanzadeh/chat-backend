import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionModel } from 'src/permission/model/permission.model';
import { PermissionRepository } from 'src/permission/permission.repository';
import { FindPermissionByIdQuery } from './find-permission-by-id.query';

@QueryHandler(FindPermissionByIdQuery)
export class FindPermissionByIdHanler
  implements IQueryHandler<FindPermissionByIdQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute({
    findPermissionByIdInput,
  }: FindPermissionByIdQuery): Promise<PermissionModel | null> {
    const result = await this.permissionRepository.findById(
      findPermissionByIdInput,
    );
    return result;
  }
}
