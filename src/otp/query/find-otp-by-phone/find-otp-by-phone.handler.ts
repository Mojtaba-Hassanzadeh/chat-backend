import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OtpModel } from '../../model/otp.model';
import { OtpRepository } from '../../otp.repository';
import { FindOtpByPhoneQuery } from './find-otp-by-phone.query';

@QueryHandler(FindOtpByPhoneQuery)
export class FindOtpByPhoneHandler
  implements IQueryHandler<FindOtpByPhoneQuery>
{
  constructor(private readonly otpRepository: OtpRepository) {}
  async execute({ phone }: FindOtpByPhoneQuery): Promise<OtpModel | null> {
    const result = this.otpRepository.findByPhone(phone);
    return result;
  }
}
