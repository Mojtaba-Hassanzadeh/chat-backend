import { Injectable } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { RoleModelDto } from '../dto/role-model.dto';

@Injectable()
export class RoleModel extends AggregateRoot {
  constructor(private readonly roleModelDto: RoleModelDto) {
    super();
  }

  getId(): string {
    return this.roleModelDto._id;
  }

  getName(): string {
    return this.roleModelDto.name;
  }

  getTitle(): string {
    return this.roleModelDto.title;
  }

  getPermissions(): string[] {
    return this.roleModelDto.permissions;
  }
}
