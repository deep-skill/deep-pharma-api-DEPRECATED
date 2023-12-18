import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles = request.auth({
      audience: process.env.AUDIENCE,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      tokenSigningAlg: process.env.TOKEN_ALG,
    }).payload.user_roles;

    const hasRoles = roles.some((role: string) => userRoles.includes(role));

    if (!hasRoles) {
      throw new ForbiddenException('User unauthorized');
    }

    return true;
  }
}
