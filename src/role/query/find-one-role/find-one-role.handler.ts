import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleModel } from 'src/role/model/role.model';
import { RoleRepository } from 'src/role/role.repository';
import { FindOneRoleQuery } from './find-one-role.query';

@QueryHandler(FindOneRoleQuery)
export class FindOneRoleHandler implements IQueryHandler<FindOneRoleQuery> {
  constructor(private readonly repository: RoleRepository) {}
  async execute({
    filter,
    fields,
    options,
  }: FindOneRoleQuery): Promise<RoleModel | null> {
    const result = await this.repository.findOne(filter, fields, options);
    return result;
  }
}
