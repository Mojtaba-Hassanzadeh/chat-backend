import { CreateOtpInput } from '../../dto/create-otp.dto';

export class CreateOtpCommand {
  constructor(public readonly createOtpInput: CreateOtpInput) {}
}
