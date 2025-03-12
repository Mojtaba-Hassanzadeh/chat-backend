import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TUser } from 'src/user/entities/user.entity';

export const GetRefreshToken = createParamDecorator(
  (data: unknown, context: ExecutionContext): TUser | undefined => {
    const ctx = GqlExecutionContext.create(context);
    const refreshToken = ctx.getContext().req.headers.authorization;
    return refreshToken.replace('Bearer', '').trim();
  },
);
