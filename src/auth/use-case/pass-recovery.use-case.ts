// user-registration.use-case.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectConnection } from '@nestjs/mongoose';
import { CoreOutput } from 'common/dtos/output.dto';
import mongoose from 'mongoose';
import { DeleteOtpCommand } from 'src/otp/command/delete-otp/delete-otp.command';
import { OtpModel } from 'src/otp/model/otp.model';
import { FindOtpByEmailQuery } from 'src/otp/query/find-otp-by-email.query.ts/find-otp-by-email.query';
import { FindOtpByPhoneQuery } from 'src/otp/query/find-otp-by-phone/find-otp-by-phone.query';
import { UserModel } from 'src/user/models/user.model';
import { SetPasswordInput } from '../dto/pass-recovery.dto';
import { FindOneUserQuery } from 'src/user/queries/find-one-user/find-one-user.query';
import { UpdateUserCommand } from 'src/user/commands/update-user/update-user.command';

@Injectable()
export class PassRecoveryUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async passRecovery({
    phone,
    email,
    verificationCode,
    password,
  }: SetPasswordInput): Promise<CoreOutput> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      let user: UserModel;
      if (phone) {
        user = await this.queryBus.execute(new FindOneUserQuery({ phone }));
        if (!user) throw new NotFoundException('PHONE_NOT_FOUND');
      } else if (email) {
        user = await this.queryBus.execute(new FindOneUserQuery({ email }));
        if (!user) throw new NotFoundException('EMAIL_NOT_FOUND');
      }

      let otp: OtpModel;
      if (phone) {
        otp = await this.queryBus.execute(new FindOtpByPhoneQuery(phone));
      } else if (email) {
        otp = await this.queryBus.execute(new FindOtpByEmailQuery(email));
      }

      const isValid =
        verificationCode && (await otp.validateCode(verificationCode));

      if (!isValid) throw new BadRequestException('ENTERED_CODE_IS_INCORRECT');

      await this.commandBus.execute(
        new UpdateUserCommand({ id: user.getId(), password }),
      );

      await this.commandBus.execute(new DeleteOtpCommand({ id: otp.getId() }));

      await session.commitTransaction();
      session.endSession();
      return { success: true };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(error);
    }
  }
}
