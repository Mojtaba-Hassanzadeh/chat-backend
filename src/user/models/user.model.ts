import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { UserModelDto } from '../dtos/user-model.dto';
import { UserRole } from '../enums/user-role.enum';

export class UserModel extends AggregateRoot {
  constructor(private readonly userModelDto: UserModelDto) {
    super();
  }

  getId(): string {
    return this.userModelDto._id;
  }

  getUsername(): string {
    return this.userModelDto.username;
  }

  getEmail(): string {
    return this.userModelDto.email;
  }

  getPassword(): string {
    return this.userModelDto.password;
  }

  getAvatar(): string {
    return this.userModelDto.avatar;
  }

  getRole(): UserRole {
    return this.userModelDto.role;
  }

  validatePassword(password: string) {
    return (
      this.userModelDto.password &&
      bcrypt.compare(password, this.userModelDto.password)
    );
  }
}
