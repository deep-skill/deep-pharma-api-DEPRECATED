import {
  Controller,
  ParseIntPipe,
  Param,
  Query,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ProviderService } from './provider.service';
import { CreateProviderDto, UpdateProviderDto } from './dto/provider.dto';
import { Provider } from '@/modules/provider/entities/provider.entity';

@ApiTags('provider')
@Controller()
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get('provider')
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted items',
  })
  @ApiOkResponse({ type: [Provider] })
  getAllProviders(@Query('includeDeleted') includeDeleted: boolean) {
    return this.providerService.findAll(includeDeleted);
  }

  @Get('provider/:id')
  @ApiOkResponse({ type: Provider })
  getProviderById(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.findById(id);
  }

  @Post('provider')
  @ApiCreatedResponse({
    type: Provider,
    description: 'Create provider',
  })
  createProvider(@Body() provider: CreateProviderDto): Promise<Provider> {
    return this.providerService.create(provider);
  }

  @Put('provider/:id')
  @ApiOkResponse({
    type: Provider,
    description: 'Update provider',
  })
  updateProvider(
    @Body() provider: UpdateProviderDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.providerService.update(provider, id);
  }

  @Delete('provider/:id')
  @ApiOkResponse({
    type: Provider,
    description: 'Delete soft provider',
  })
  softDeleteProvider(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.softDelete(id);
  }
}
