import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleModel } from 'src/role/model/role.model';
import { RoleRepository } from 'src/role/role.repository';
import { FindRoleByIdQuery } from './find-role-by-id.query';

@QueryHandler(FindRoleByIdQuery)
export class FindRoleByIdHanler implements IQueryHandler<FindRoleByIdQuery> {
  constructor(private readonly roleRepository: RoleRepository) {}
  async execute({
    findRoleByIdInput,
  }: FindRoleByIdQuery): Promise<RoleModel | null> {
    const result = await this.roleRepository.findById(findRoleByIdInput.id);
    return result;
  }
}
