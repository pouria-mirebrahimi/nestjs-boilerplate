import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: keyof UserInfo, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req?.user;
    const res = data && req?.user[data];
    return res || user;
  },
);

class UserInfo {
  id: number;
  name: string;
  email: string;
}
