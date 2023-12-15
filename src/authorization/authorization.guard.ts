import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  auth,
  InvalidTokenError,
  UnauthorizedError,
  requiredScopes,
} from 'express-oauth2-jwt-bearer';
import { Request, Response } from 'express';
import { promisify } from 'util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const validateAccessToken = promisify(auth({
      audience: 'http://localhost:3001/',
        issuer: 'https://dev-nqzpabibd42atqci.us.auth0.com/',
        tokenSigningAlg: 'RS256',
    }));

    try {
      await validateAccessToken(request, response);


      return true;
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        throw new UnauthorizedException('Bad credentials');
      }

      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException('Authentication required');
      }

      throw new InternalServerErrorException();
    }
  }
}
