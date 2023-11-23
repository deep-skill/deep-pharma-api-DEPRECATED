import {
  Controller,
  ParseIntPipe,
  ParseBoolPipe,
  Param,
  Query,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto, UpdateProviderDto } from './dto/provider.dto';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  getProviders(
    @Query('includDeleted', ParseBoolPipe) includeDeleted: boolean = false,
  ) {
    return this.providerService.findAll(includeDeleted);
  }

  @Get(':id')
  getProviderById(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.findById(id);
  }

  @Post()
  createProvider(@Body() provider: CreateProviderDto) {
    return this.providerService.create(provider);
  }

  @Put(':id')
  updateProvider(
    @Body() provider: UpdateProviderDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.providerService.update(provider, id);
  }

  @Delete(':id')
  softDeleteProvider(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.softDelete(id);
  }
}
