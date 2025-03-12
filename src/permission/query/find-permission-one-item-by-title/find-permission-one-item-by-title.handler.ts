import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionModel } from 'src/permission/model/permission.model';
import { PermissionRepository } from 'src/permission/permission.repository';
import { FindPermissionOneItemByTitleQuery } from './find-permission-one-item-by-title.query';

@QueryHandler(FindPermissionOneItemByTitleQuery)
export class FindPermissionOneItemByTitleHanler
  implements IQueryHandler<FindPermissionOneItemByTitleQuery>
{
  constructor(private readonly repository: PermissionRepository) {}
  async execute({
    title,
    id,
  }: FindPermissionOneItemByTitleQuery): Promise<PermissionModel | null> {
    const result = await this.repository.findOneItemByTitle(title, id);
    return result;
  }
}
