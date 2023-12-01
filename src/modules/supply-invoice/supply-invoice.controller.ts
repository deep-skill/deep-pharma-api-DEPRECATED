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
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateSupplyInvoiceDto,
  UpdateSupplyInvoiceDto,
} from './dto/supply-invoice.dto';
import { SupplyInvoiceService } from './supply-invoice.service';
import { SupplyInvoice } from './entities/supply-invoice.entity';

@ApiTags('supply-invoice')
@Controller()
export class SupplyInvoiceController {
  constructor(private readonly supplyInvoiceService: SupplyInvoiceService) {}

  @Get('supply-invoice')
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted supply-invoices',
  })
  @ApiOkResponse({ type: [SupplyInvoice] })
  getAllSupplyInvoices(@Query('includeDeleted') includeDeleted = false) {
    return this.supplyInvoiceService.findAll(includeDeleted);
  }

  @Get('supply-invoice/:id')
  @ApiOkResponse({ type: SupplyInvoice })
  getSupplyInvoiceById(@Param('id', ParseIntPipe) id: number) {
    return this.supplyInvoiceService.findById(id);
  }

  @Get('provider/:id/supply-invoice')
  @ApiOkResponse({
    type: [SupplyInvoice],
    description: 'Supply invoices obtained by provider id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'Foreign key id',
  })
  getSupplyInvoiceByForeignKey(@Param('id', ParseIntPipe) id: number) {
    return this.supplyInvoiceService.findSupplyInvoiceByProviderId(id);
  }

  @Post('supply-invoice')
  @ApiCreatedResponse({
    type: SupplyInvoice,
    description: 'Create supply invoice',
  })
  createSupplyInvoice(
    @Body() supplyInvoice: CreateSupplyInvoiceDto,
  ): Promise<SupplyInvoice> {
    return this.supplyInvoiceService.create(supplyInvoice);
  }

  @Put('supply-invoice/:id')
  @ApiOkResponse({
    type: SupplyInvoice,
    description: 'Update supply invoice',
  })
  updateInventory(
    @Body() supplyInvoice: UpdateSupplyInvoiceDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.supplyInvoiceService.update(supplyInvoice, id);
  }

  @Delete('supply-invoice/:id')
  @ApiOkResponse({
    type: SupplyInvoice,
    description: 'Delete soft supply invoice',
  })
  softDeleteInventory(@Param('id', ParseIntPipe) id: number) {
    return this.supplyInvoiceService.softDelete(id);
  }
}
