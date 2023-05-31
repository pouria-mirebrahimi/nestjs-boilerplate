import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
@Injectable()
export class AuthorizedGuard implements CanActivate {
  constructor(private roles: string[]) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    return !!user?.roles.filter(Set.prototype.has, new Set(this.roles)).length;
  }
}
