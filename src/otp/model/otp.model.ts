import { Injectable } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { OtpModelDto } from '../dto/otp-model.dto';

@Injectable()
export class OtpModel extends AggregateRoot {
  constructor(private readonly otpModelDto: OtpModelDto) {
    super();
  }

  getId(): string {
    return this.otpModelDto._id;
  }

  getPhone(): string {
    return this.otpModelDto.phone;
  }

  getEmail(): string {
    return this.otpModelDto.email;
  }

  getCode(): string {
    return this.otpModelDto.code;
  }

  validateCode(code: string) {
    return this.otpModelDto.code && bcrypt.compare(code, this.otpModelDto.code);
  }
}
