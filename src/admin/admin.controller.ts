import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller()
export class AdminController {
  constructor() {}

  @Get('hello')
  getHello(): string {
    return 'Hello';
  }
}
