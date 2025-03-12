import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { OtpRepository } from '../../otp.repository';
import { DeleteOtpCommand } from './delete-otp.command';

@CommandHandler(DeleteOtpCommand)
export class DeleteOtpHandler implements ICommandHandler<DeleteOtpCommand> {
  constructor(private readonly otpRepository: OtpRepository) {}

  async execute(command: DeleteOtpCommand) {
    const { deleteOtpInput } = command;

    await this.otpRepository.delete(deleteOtpInput);
  }
}
