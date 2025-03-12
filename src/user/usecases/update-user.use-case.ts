import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import {
  UpdateUserByCeoInput,
  UpdateUserOutput,
} from '../dtos/update-user.dto';
import { UserHelper } from '../helper/user-helper';
import { UpdateUserCommand } from '../commands/update-user/update-user.command';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly helper: UserHelper,
  ) {}

  async updateUser(input: UpdateUserByCeoInput): Promise<UpdateUserOutput> {
    const { password } = input;
    try {
      await this.helper.validateUserId(input.userId);
      const hashPassword = password && (await bcrypt.hash(password, 10));
      if (hashPassword) {
        await this.commandBus.execute(
          new UpdateUserCommand({
            ...input,
            id: input.userId,
            password: hashPassword,
          }),
        );
      } else {
        await this.commandBus.execute(
          new UpdateUserCommand({ ...input, id: input.userId }),
        );
      }
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
