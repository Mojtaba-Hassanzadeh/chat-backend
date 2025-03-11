import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SendEmailEvent } from './send-otp-with-email.event';
import { generateOTP } from 'common/utils/generate-otp.util';
import { CreateOtpCommand } from 'src/otp/command/create-otp/create-otp.command';
import { SendMailUseCase } from 'src/email/use-case/send-mail.use-case';

@EventsHandler(SendEmailEvent)
export class SendEmailEventHandler implements IEventHandler<SendEmailEvent> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly mailUseCase: SendMailUseCase,
  ) {}

  async handle({ email }: SendEmailEvent) {
    const code = generateOTP();
    await this.commandBus.execute(
      new CreateOtpCommand({ email: email, code: code }),
    );
    await this.mailUseCase.sendEmail(email, code);
  }
}
