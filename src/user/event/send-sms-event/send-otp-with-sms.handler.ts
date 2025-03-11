import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SendSmsEvent } from './send-otp-with-sms.event';
import { generateOTP } from 'common/utils/generate-otp.util';
import { CreateOtpCommand } from 'src/otp/command/create-otp/create-otp.command';
import { SendSmsUseCase } from 'src/sms/use-case/send-sms.use-case';

@EventsHandler(SendSmsEvent)
export class SendSmsEventHandler implements IEventHandler<SendSmsEvent> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly smsUseCase: SendSmsUseCase,
  ) {}

  async handle({ phone }: SendSmsEvent) {
    const code = generateOTP();
    await this.commandBus.execute(
      new CreateOtpCommand({ phone: phone, code: code }),
    );
    await this.smsUseCase.sendSms(phone, code);
  }
}
