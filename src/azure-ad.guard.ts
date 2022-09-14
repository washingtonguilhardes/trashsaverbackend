import {
  CanActivate,
  ConsoleLogger,
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { ApplicationException } from './app.exception';
import { UserCapabity } from './user-access-control/entities/user-access-control.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new ConsoleLogger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('VALIDATE USER ACCESS');
    return true;
  }
}

export const Scopes = (...scopes: UserCapabity[]) => SetMetadata('scopes', scopes);

export interface UserAccessCheckData {
  user: any;
  access: any;
}

export const AuthenticatedUserData = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserAccessCheckData => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const access = request.access;
    if (!user && !access) {
      throw new ApplicationException(
        'Usuario nao autenticado',
        'UNAUTHENTICATED_USER',
        HttpStatus.NOT_FOUND
      );
    }

    return { user, access };
  }
);
