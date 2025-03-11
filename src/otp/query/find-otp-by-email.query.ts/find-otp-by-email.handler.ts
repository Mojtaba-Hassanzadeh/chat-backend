import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OtpModel } from '../../model/otp.model';
import { OtpRepository } from '../../otp.repository';
import { FindOtpByEmailQuery } from './find-otp-by-email.query';

@QueryHandler(FindOtpByEmailQuery)
export class FindOtpByEmailHandler
  implements IQueryHandler<FindOtpByEmailQuery>
{
  constructor(private readonly otpRepository: OtpRepository) {}
  async execute({ email }: FindOtpByEmailQuery): Promise<OtpModel | null> {
    const result = this.otpRepository.findByEmail(email);
    return result;
  }
}
