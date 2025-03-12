import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionModel } from 'src/permission/model/permission.model';
import { PermissionRepository } from 'src/permission/permission.repository';
import { FindPermissionOneItemByNameQuery } from './find-permission-one-item-by-name.query';

@QueryHandler(FindPermissionOneItemByNameQuery)
export class FindPermissionOneItemByNameHanler
  implements IQueryHandler<FindPermissionOneItemByNameQuery>
{
  constructor(private readonly repository: PermissionRepository) {}
  async execute({
    name,
    id,
  }: FindPermissionOneItemByNameQuery): Promise<PermissionModel | null> {
    const result = await this.repository.findOneItemByName(name, id);
    return result;
  }
}
