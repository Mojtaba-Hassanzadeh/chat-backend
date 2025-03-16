import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/image/image.module';
import { MessageModule } from 'src/message/message.module';
import { OtpModule } from 'src/otp/otp.module';
import { PermissionModule } from 'src/permission/permission.module';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    PermissionModule,
    RoleModule,
    OtpModule,
    AuthModule,
    ImageModule,
    MessageModule,
  ],
})
export class RootModule {}
