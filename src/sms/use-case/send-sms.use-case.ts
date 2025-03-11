import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class SendSmsUseCase {
  constructor(private readonly httpService: HttpService) {}

  async sendSms(phone: string, code: string): Promise<boolean> {
    const user = process.env.SMS_USER;
    const pass = process.env.SMS_PASS;
    const fromNum = process.env.SMS_NUMBER;
    const toNum = phone;
    const patternCode = process.env.SMS_PATTERN_CODE;

    try {
      await this.httpService.axiosRef.post(process.env.SMS_URL as string, {
        op: 'pattern',
        user,
        pass,
        fromNum,
        toNum,
        patternCode,
        inputData: [{ code }],
      });
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
