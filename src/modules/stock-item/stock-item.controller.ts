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
  ParseBoolPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { StockItemsService } from './stock-item.service';
import { CreateStockItemDto, UpdateStockItemDto } from './dto/stock-item.dto';
<<<<<<< HEAD
import { StockItem } from 'src/models/stock-item.model';
=======
import { StockItem } from 'src/models/stock-item.entity';
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1

@ApiTags('stock-item')
@Controller('stock-item')
export class StockItemsController {
  constructor(private readonly stockItemsService: StockItemsService) {}

  @Get()
<<<<<<< HEAD
  getStockItems(
    @Query('includeDeleted', ParseBoolPipe) includeDeleted: boolean = false,
  ) {
=======
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted items',
  })
  @ApiOkResponse({ type: [StockItem] })
  getAllStockItems(@Query('includeDeleted') includeDeleted: boolean) {
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1
    return this.stockItemsService.findAll(includeDeleted);
  }

  @Get(':id')
  @ApiOkResponse({ type: StockItem })
  getStockItemById(@Param('id', ParseIntPipe) id: number) {
    return this.stockItemsService.findById(id);
  }

  @Get(':foreignKey/:id')
  @ApiOkResponse({
    type: [StockItem],
    description: 'Stock items obtained by several foreign keys',
  })
  @ApiParam({
    name: 'foreignKey',
    required: true,
    type: 'string',
    description:
      'Foreign key options: inventory_id, supply_invoice_id, sale_item_id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'Foreign key id',
  })
  getStockItemsByForeignKey(
    @Param('id', ParseIntPipe) id: number,
    @Param('foreignKey') foreignKey: string,
  ): Promise<StockItem[]> {
    return this.stockItemsService.findByForeignKey(id, foreignKey);
  }

  @Post()
  @ApiCreatedResponse({
    type: StockItem,
    description: 'Create stock item',
  })
  createStockItem(@Body() stockItem: CreateStockItemDto): Promise<StockItem> {
    return this.stockItemsService.create(stockItem);
  }

  @Put(':id')
  @ApiOkResponse({
    type: StockItem,
    description: 'Update stock item',
  })
  updateStockItem(
    @Body() stockItem: UpdateStockItemDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.stockItemsService.update(stockItem, id);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: StockItem,
    description: 'Delete soft stock item',
  })
  softDeleteStockItem(@Param('id', ParseIntPipe) id: number) {
    return this.stockItemsService.softDelete(id);
  }
}
