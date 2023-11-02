import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
@ApiTags('App Controller')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOperation({ summary: '"Hello World"' })
  @ApiResponse({ status: 200, description: 'Returns "Hello World"' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
