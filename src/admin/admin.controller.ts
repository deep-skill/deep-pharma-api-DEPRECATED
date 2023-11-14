import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';

@Controller()
@UseGuards(AuthorizationGuard, RolesGuard)
export class AdminController {
  constructor() {}

  @Get('public')
  getPrueba() {
    return { message: 'This is a route' };
  }

  @Roles(['Admin', 'Owner'])
  @Get('private')
  getHello() {
    return {
      message: 'This is a protected route for authorized users',
    };
  }
}
