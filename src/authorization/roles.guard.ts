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
      audience: 'http://localhost:3001/',
        issuer: 'https://dev-nqzpabibd42atqci.us.auth0.com/',
        tokenSigningAlg: 'RS256',
    }).payload.user_roles;
    console.log(userRoles);
    const hasRoles = roles.some((role: string) => userRoles.includes(role));

    if (!hasRoles) {
      throw new ForbiddenException('User unauthorized');
    }

    return true;
  }
}
