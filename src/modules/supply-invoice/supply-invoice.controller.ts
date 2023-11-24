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

import {
  CreateSupplyInvoiceDto,
  UpdateSupplyInvoiceDto,
} from './dto/supply-invoice.dto';
import { SupplyInvoiceService } from './supply-invoice.service';
import { SupplyInvoice } from 'src/models/supply-invoice.entity';

@ApiTags('supply-invoice')
@Controller('supply-invoice')
export class SupplyInvoiceController {
  constructor(private readonly supplyInvoiceService: SupplyInvoiceService) {}

  @Get()
<<<<<<< HEAD
  getSupplyInvoices(
    @Query('includeDeleted', ParseBoolPipe) includeDeleted: boolean = false,
  ) {
=======
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted items',
  })
  @ApiOkResponse({ type: [SupplyInvoice] })
  getAllSupplyInvoices(@Query('includeDeleted') includeDeleted: boolean) {
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1
    return this.supplyInvoiceService.findAll(includeDeleted);
  }

  @Get(':id')
  @ApiOkResponse({ type: SupplyInvoice })
  getSupplyInvoiceById(@Param('id', ParseIntPipe) id: number) {
    return this.supplyInvoiceService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: SupplyInvoice,
    description: 'Create supply invoice',
  })
  createSupplyInvoice(
    @Body() supplyInvoice: CreateSupplyInvoiceDto,
  ): Promise<SupplyInvoice> {
    return this.supplyInvoiceService.create(supplyInvoice);
  }

  @Put(':id')
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

  @Delete(':id')
  @ApiOkResponse({
    type: SupplyInvoice,
    description: 'Delete soft supply invoice',
  })
  softDeleteInventory(@Param('id', ParseIntPipe) id: number) {
    return this.supplyInvoiceService.softDelete(id);
  }
}
