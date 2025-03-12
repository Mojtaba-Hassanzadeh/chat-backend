import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionModel } from 'src/permission/model/permission.model';
import { PermissionRepository } from 'src/permission/permission.repository';
import { FindPermissionByNameQuery } from './find-permission-by-name.query';

@QueryHandler(FindPermissionByNameQuery)
export class FindPermissionByNameHanler
  implements IQueryHandler<FindPermissionByNameQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute({
    name,
  }: FindPermissionByNameQuery): Promise<PermissionModel | null> {
    const result = await this.permissionRepository.findByName(name);
    return result;
  }
}
