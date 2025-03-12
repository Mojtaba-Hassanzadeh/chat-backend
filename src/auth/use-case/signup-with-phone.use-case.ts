import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CoreOutput } from 'common/dtos/output.dto';
import { generateOTP } from 'common/utils/generate-otp.util';
import { CreateOtpCommand } from 'src/otp/command/create-otp/create-otp.command';
import { SendSmsUseCase } from 'src/sms/use-case/send-sms.use-case';
import { CreateUserWithPhoneCommand } from 'src/user/commands/create-user-with-phone/create-user-with-phone.command';
import { UserModel } from 'src/user/models/user.model';
import { SignupWithPhoneInput } from '../dto/signup.dto';
import { FindOneUserQuery } from 'src/user/queries/find-one-user/find-one-user.query';

@Injectable()
export class SignupWithPhoneUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly smsUseCase: SendSmsUseCase,
  ) {}

  async signupWithPhone({ phone }: SignupWithPhoneInput): Promise<CoreOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindOneUserQuery({ phone }),
      );
      if (user && user.getIsVerified()) {
        throw new BadRequestException('USER_ALREADY_EXISTS');
      } else if (user && !user.getIsVerified()) {
        const code = generateOTP();
        await this.commandBus.execute(
          new CreateOtpCommand({ phone: phone, code: code }),
        );
        await this.smsUseCase.sendSms(phone, code);
      } else {
        await this.commandBus.execute(new CreateUserWithPhoneCommand(phone));
      }
      return {
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
