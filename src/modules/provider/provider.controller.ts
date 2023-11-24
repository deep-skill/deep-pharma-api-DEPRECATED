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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ProviderService } from './provider.service';
import { CreateProviderDto, UpdateProviderDto } from './dto/provider.dto';
import { Provider } from 'src/models/provider.entity';

@ApiTags('provider')
@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted items',
  })
  @ApiOkResponse({ type: [Provider] })
  getAllProviders(@Query('includeDeleted') includeDeleted: boolean = false) {
    return this.providerService.findAll(includeDeleted);
  }

  @Get(':id')
  @ApiOkResponse({ type: Provider })
  getProviderById(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: Provider,
    description: 'Create provider',
  })
  createProvider(@Body() provider: CreateProviderDto): Promise<Provider> {
    return this.providerService.create(provider);
  }

  @Put(':id')
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

  @Delete(':id')
  @ApiOkResponse({
    type: Provider,
    description: 'Delete soft provider',
  })
  softDeleteProvider(@Param('id', ParseIntPipe) id: number) {
    return this.providerService.softDelete(id);
  }
}
