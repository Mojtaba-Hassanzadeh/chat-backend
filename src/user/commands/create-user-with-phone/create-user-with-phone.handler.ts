import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserWithPhoneCommand } from './create-user-with-phone.command';
import { UserModelFactory } from 'src/user/models/user-model.factory';

@CommandHandler(CreateUserWithPhoneCommand)
export class CreateUserWithPhoneHandler
  implements ICommandHandler<CreateUserWithPhoneCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly userFactory: UserModelFactory,
  ) {}

  async execute(command: CreateUserWithPhoneCommand) {
    const { phone } = command;

    const newUser = this.publisher.mergeObjectContext(
      await this.userFactory.createWithPhone(phone),
    );
    newUser.commit();
  }
}
