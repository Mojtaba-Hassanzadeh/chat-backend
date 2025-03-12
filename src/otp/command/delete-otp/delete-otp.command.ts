import { DeleteOtpInput } from '../../dto/delete-otp.dto';

export class DeleteOtpCommand {
  constructor(public readonly deleteOtpInput: DeleteOtpInput) {}
}
