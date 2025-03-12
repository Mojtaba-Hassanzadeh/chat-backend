import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionModel } from 'src/permission/model/permission.model';
import { PermissionRepository } from 'src/permission/permission.repository';
import { FindPermissionByIdsQuery } from './find-permission-by-ids.query';

@QueryHandler(FindPermissionByIdsQuery)
export class FindPermissionByIdsHanler
  implements IQueryHandler<FindPermissionByIdsQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute({
    findPermissionByIdsInput,
  }: FindPermissionByIdsQuery): Promise<PermissionModel[] | null> {
    const result = await this.permissionRepository.findManyById(
      findPermissionByIdsInput,
    );
    return result;
  }
}
