import { UserRole } from '../enums/user-role.enum';

export class UserModelDto {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  role?: UserRole;
}
