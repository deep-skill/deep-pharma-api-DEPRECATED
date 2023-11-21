import {
  Controller,
  Param,
  Query,
  Get,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { StockItemsService } from './stock-item.service';
import { CreateStockItemDto, UpdateStockItemDto } from './dto/stock-item.dto';

@Controller('stock-item')
export class StockItemsController {
  constructor(private readonly stockItemsService: StockItemsService) {}

  @Get()
  getStockItems(@Query('includeDeleted') includeDeleted: boolean) {
    return this.stockItemsService.findAll(includeDeleted);
  }

  @Get(':id')
  getStockItemById(@Param('id', ParseIntPipe) id: number) {
    return this.stockItemsService.findById(id);
  }

  @Post()
  createStockItem(@Body() stockItem: CreateStockItemDto) {
    return this.stockItemsService.create(stockItem);
  }

  @Put(':id')
  updateStockItem(
    @Body() stockItem: UpdateStockItemDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.stockItemsService.update(stockItem, id);
  }

  @Delete(':id')
  softDeleteStockItem(@Param('id', ParseIntPipe) id: number) {
    return this.stockItemsService.softDelete(id);
  }
}
