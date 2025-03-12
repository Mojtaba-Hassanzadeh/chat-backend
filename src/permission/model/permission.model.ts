import { Injectable } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { PermissionModelDto } from '../dto/permission-model.dto';

@Injectable()
export class PermissionModel extends AggregateRoot {
  constructor(private readonly permissionModelDto: PermissionModelDto) {
    super();
  }

  getId(): string {
    return this.permissionModelDto._id;
  }

  getName(): string {
    return this.permissionModelDto.name;
  }

  getTitle(): string {
    return this.permissionModelDto.title;
  }

  getParent(): string {
    return this.permissionModelDto.parent;
  }
}
