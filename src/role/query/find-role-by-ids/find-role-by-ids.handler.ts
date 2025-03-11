import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleModel } from 'src/role/model/role.model';
import { RoleRepository } from 'src/role/role.repository';
import { FindRoleByIdsQuery } from './find-role-by-ids.query';

@QueryHandler(FindRoleByIdsQuery)
export class FindRoleByIdsHanler implements IQueryHandler<FindRoleByIdsQuery> {
  constructor(private readonly roleRepository: RoleRepository) {}
  async execute({
    findRoleByIdsInput,
  }: FindRoleByIdsQuery): Promise<RoleModel[] | null> {
    const result = await this.roleRepository.findManyByIds(
      findRoleByIdsInput.ids,
    );
    return result;
  }
}
