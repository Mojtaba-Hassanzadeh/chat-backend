import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserWithEmailCommand } from './create-user-with-email.command';
import { UserModelFactory } from 'src/user/model/user-model.factory';

@CommandHandler(CreateUserWithEmailCommand)
export class CreateUserWithEmailHandler
  implements ICommandHandler<CreateUserWithEmailCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly userFactory: UserModelFactory,
  ) {}

  async execute(command: CreateUserWithEmailCommand) {
    const { email } = command;

    const newUser = this.publisher.mergeObjectContext(
      await this.userFactory.createWithEmail(email),
    );
    newUser.commit();
  }
}
