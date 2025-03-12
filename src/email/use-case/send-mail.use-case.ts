import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendMailUseCase {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: string, code: string): Promise<boolean> {
    try {
      this.mailerService.sendMail({
        to: email,
        from: 'plaza@gmail.com',
        subject: 'پلازا',
        text: `کد تایید شما : ${code}`,
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
