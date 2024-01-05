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
} from 'express-oauth2-jwt-bearer';
import { Request, Response } from 'express';
import { promisify } from 'util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const validateAccessToken = promisify(auth({
      audience: process.env.AUDIENCE,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      tokenSigningAlg: process.env.TOKEN_ALG,
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
