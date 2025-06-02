import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: any = request.user;
    return this.matchRoles(roles, user.userRole); // Usar userRole aquí
  }

  matchRoles(roles: string[], userRoles: string[]){
    let access = false;
    if (userRoles && Array.isArray(userRoles)) {
      userRoles.forEach((userRole)=>{
        if(roles.includes(userRole)) access = true;
      });
    }
    return access;
  }
}