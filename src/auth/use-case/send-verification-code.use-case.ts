import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { generateOTP } from 'common/utils/generate-otp.util';
import { SendMailUseCase } from 'src/email/use-case/send-mail.use-case';
import { CreateOtpCommand } from 'src/otp/command/create-otp/create-otp.command';
import { SendSmsUseCase } from 'src/sms/use-case/send-sms.use-case';
import { CreateUserWithEmailCommand } from 'src/user/command/create-user-with-email/create-user-with-email.command';
import { CreateUserWithPhoneCommand } from 'src/user/command/create-user-with-phone/create-user-with-phone.command';
import { UserModel } from 'src/user/model/user.model';
import {
  SendVerificationCodeInput,
  SendVerificationCodeOutput,
} from '../dto/send-verification-code.dto';
import { FindOneUserQuery } from 'src/user/query/find-one-user/find-one-user.query';

@Injectable()
export class SendVerificationCodeUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly smsUseCase: SendSmsUseCase,
    private readonly mailUseCase: SendMailUseCase,
  ) {}

  async sendVerificationCode({
    phone,
    email,
  }: SendVerificationCodeInput): Promise<SendVerificationCodeOutput> {
    try {
      let isUserExists = false;
      if (phone) {
        const user: UserModel = await this.queryBus.execute(
          new FindOneUserQuery({ phone }),
        );
        if (user && user.getIsVerified() === true) isUserExists = true;

        if (!user)
          await this.commandBus.execute(new CreateUserWithPhoneCommand(phone));

        const code = generateOTP();

        console.log({ code: code });

        await this.commandBus.execute(
          new CreateOtpCommand({ phone: phone, code: code }),
        );
        await this.smsUseCase.sendSms(phone, code);
        return {
          success: true,
          isUserExists,
        };
      } else if (email) {
        const user: UserModel = await this.queryBus.execute(
          new FindOneUserQuery({ email }),
        );
        if (user && user.getIsVerified() === true) isUserExists = true;

        if (!user)
          await this.commandBus.execute(new CreateUserWithEmailCommand(email));

        const code = generateOTP();
        await this.commandBus.execute(
          new CreateOtpCommand({ email: email, code: code }),
        );
        await this.mailUseCase.sendEmail(email, code);
        return {
          success: true,
          isUserExists,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
