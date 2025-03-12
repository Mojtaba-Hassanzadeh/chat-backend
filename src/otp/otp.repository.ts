import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DeleteOtpInput } from './dto/delete-otp.dto';
import { FindOtpByIdInput } from './dto/find-otp.dto';
import { OtpEntity, TOtpEntity } from './entity/otp.entity';
import { OtpEntityFactory } from './entity/otp.factory';
import { OtpModel } from './model/otp.model';

@Injectable()
export class OtpRepository {
  constructor(
    @InjectModel(OtpEntity.name)
    private readonly otpModel: Model<TOtpEntity>,
    private readonly otpFactory: OtpEntityFactory,
  ) {}

  public async findById({ id }: FindOtpByIdInput): Promise<OtpModel | null> {
    const otp = await this.otpModel.findById(id).exec();
    return this.otpFactory.createFromEntity(otp);
  }

  public async findByPhone(phone: string): Promise<OtpModel | null> {
    const otp = await this.otpModel.findOne({ phone }).exec();
    return this.otpFactory.createFromEntity(otp);
  }

  public async findByEmail(email: string): Promise<OtpModel | null> {
    const otp = await this.otpModel.findOne({ email }).exec();
    return this.otpFactory.createFromEntity(otp);
  }

  public async create(input: OtpModel): Promise<void> {
    const otp = new this.otpModel(this.otpFactory.createFromModel(input));
    await otp.save();
  }

  public async delete({ id }: DeleteOtpInput): Promise<void> {
    await this.otpModel.findByIdAndDelete(id).exec();
  }
}
