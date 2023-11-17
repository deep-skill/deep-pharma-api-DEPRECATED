import {
    Controller,
    Param,
    Get,
    Post,
    Put,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { StockItemsService } from './stock-item.service';
  import { CreateStockItemDto, UpdateStockItemDto } from './dtos/stock-items.dto';
  
  @Controller('stock-items')
  export class StockItemsController {
    constructor(private readonly stockItemsService: StockItemsService) {}
  
    @Get()
    getStockItems() {
      return this.stockItemsService.findAll();
    }
  
    @Get(':id')
    getStockItemById(@Param('id', ParseIntPipe) id: number) {
      return this.stockItemsService.findOne(id);
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
  }