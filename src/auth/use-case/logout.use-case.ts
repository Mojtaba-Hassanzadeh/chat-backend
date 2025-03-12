// user-registration.use-case.ts
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import * as argon2 from 'argon2';
import { UserModel } from 'src/user/models/user.model';
import { FindUserByIdQuery } from 'src/user/queries/find-user-by-id/find-user-by-id.query';
import { LogoutOutput } from '../dto/logout.dto';
import { UpdateUserCommand } from 'src/user/commands/update-user/update-user.command';

@Injectable()
export class LogoutUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async logout(userId: string, refreshToken: string): Promise<LogoutOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindUserByIdQuery({ id: userId }),
      );
      const newRefreshTokens: string[] = [];
      const userRefreshTokens = user.getRefreshTokens();
      let isMatches = false;

      for (const item of userRefreshTokens) {
        const refreshTokenMatches = await argon2.verify(item, refreshToken);
        if (!refreshTokenMatches) newRefreshTokens.push(item);
        else isMatches = true;
      }

      if (!isMatches) throw new ForbiddenException('ACCESS_DENIED');

      newRefreshTokens.reverse();

      await this.commandBus.execute(
        new UpdateUserCommand({
          id: userId,
          refreshToken: newRefreshTokens,
        }),
      );

      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
