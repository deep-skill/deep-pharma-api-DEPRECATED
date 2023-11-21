import {
  Controller,
  ParseIntPipe,
  Param,
  Query,
  Body,
  Get,
  Post,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { SupplyInvoiceService } from './supply-invoice.service';
import {
  CreateSupplyInvoiceDto,
  UpdateSupplyInvoiceDto,
} from './dto/supply-invoice.dto';

@Controller('supply-invoice')
export class SupplyInvoiceController {
  constructor(private readonly supplyInvoiceService: SupplyInvoiceService) {}

  @Get()
  getSupplyInvoices(@Query('includeDeleted') includeDeleted: boolean) {
    return this.supplyInvoiceService.findAll(includeDeleted);
  }

  @Get(':id')
  getSupplyInvoiceById(@Param('id', ParseIntPipe) id: number) {
    return this.supplyInvoiceService.findById(id);
  }

  @Post()
  createSupplyInvoice(@Body() supplyInvoice: CreateSupplyInvoiceDto) {
    return this.supplyInvoiceService.create(supplyInvoice);
  }

  @Put(':id')
  updateInventory(
    @Body() supplyInvoice: UpdateSupplyInvoiceDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.supplyInvoiceService.update(supplyInvoice, id);
  }

  @Delete(':id')
  softDeleteInventory(@Param('id', ParseIntPipe) id: number) {
    return this.supplyInvoiceService.softDelete(id);
  }
}
