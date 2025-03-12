import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { CreateOtpInput } from '../dto/create-otp.dto';
import { OtpRepository } from '../otp.repository';
import { OtpModel } from './otp.model';
import { ModelFactory } from 'common/repositories/model.factory';

@Injectable()
export class OtpModelFactory implements ModelFactory<OtpModel> {
  constructor(private readonly otpRepository: OtpRepository) {}

  async create({ phone, email, code }: CreateOtpInput): Promise<OtpModel> {
    const otp = new OtpModel({
      _id: new ObjectId().toHexString(),
      phone,
      email,
      code,
    });
    await this.otpRepository.create(otp);
    return otp;
  }
}
