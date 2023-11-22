import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SaleItemService } from './sale-item.service';
import { CreateSaleItemDto, UpdateSaleItemDto } from './dto/sale-item.dto';
import { SaleItem } from 'src/models/sale-item.model';

@Controller('sale-item')
export class SaleItemController {
  constructor(private readonly saleItemService: SaleItemService) {}

  @Get()
  findAllSaleItems(
    @Query('includeDeleted') includeDeleted = false,
  ): Promise<SaleItem[]> {
    return this.saleItemService.findAll(includeDeleted);
  }

  @Get(':id')
  findSaleItemById(@Param('id', ParseIntPipe) id: number): Promise<SaleItem> {
    return this.saleItemService.findById(id);
  }

  @Post()
  createSaleItem(@Body() saleItemData: CreateSaleItemDto): Promise<SaleItem> {
    return this.saleItemService.create(saleItemData);
  }

  @Put(':id')
  updateSaleItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() saleItemData: UpdateSaleItemDto,
  ): Promise<SaleItem> {
    return this.saleItemService.update(id, saleItemData);
  }

  @Delete(':id')
  softDeleteSaleItem(@Param('id', ParseIntPipe) id: number): Promise<SaleItem> {
    return this.saleItemService.softDelete(id);
  }
}
