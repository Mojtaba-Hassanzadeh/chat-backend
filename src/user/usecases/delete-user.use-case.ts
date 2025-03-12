import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../commands/delete-user/delete-user.command';
import { DeleteUserInput, DeleteUserOutput } from '../dtos/delete-user.dto';
import { UserHelper } from '../helper/user-helper';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly helper: UserHelper,
    // private readonly deleteImageUseCase: DeleteImageUseCase,
  ) {}

  async deleteUser(input: DeleteUserInput): Promise<DeleteUserOutput> {
    try {
      await this.helper.validateUserId(input.userId);
      await this.commandBus.execute(new DeleteUserCommand(input));
      // const user: UserModel = await this.commandBus.execute(
      //   new DeleteUserCommand(input),
      // );
      // user &&
      //   user.getAvatar() &&
      //   (await this.deleteImageUseCase.deleteImage({
      //     id: user.getAvatar()._id.toString(),
      //   }));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
