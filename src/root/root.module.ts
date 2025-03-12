import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { OtpModule } from 'src/otp/otp.module';
import { PermissionModule } from 'src/permission/permission.module';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, PermissionModule, RoleModule, OtpModule, AuthModule],
})
export class RootModule {}
