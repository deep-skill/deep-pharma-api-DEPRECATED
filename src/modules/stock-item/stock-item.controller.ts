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

import { StockItemService } from './stock-item.service';
import { CreateStockItemDto, UpdateStockItemDto } from './dto/stock-item.dto';
import { StockItem } from '@/modules/stock-item/entities/stock-item.entity';

@ApiTags('stock-item')
@Controller()
export class StockItemController {
  constructor(private readonly stockItemsService: StockItemService) {}

  @Get('stock-item')
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted items',
  })
  @ApiOkResponse({ type: [StockItem] })
  getAllStockItems(@Query('includeDeleted') includeDeleted: boolean) {
    return this.stockItemsService.findAll(includeDeleted);
  }

  @Get('stock-item/:id')
  @ApiOkResponse({ type: StockItem })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'Find by stock item id',
  })
  getStockItemById(@Param('id', ParseIntPipe) id: number): Promise<StockItem> {
    return this.stockItemsService.findById(id);
  }

  @Get(':foreignKey/:id/stock-item')
  @ApiOkResponse({
    type: [StockItem],
    description: 'Stock items obtained by several foreign keys',
  })
  @ApiParam({
    name: 'foreignKey',
    required: true,
    type: 'string',
    description:
      'Foreign key options: inventory-id, supply-invoice-id, sale-item-id',
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

  @Post('stock-item')
  @ApiCreatedResponse({
    type: StockItem,
    description: 'Create stock item',
  })
  createStockItem(@Body() stockItem: CreateStockItemDto): Promise<StockItem> {
    return this.stockItemsService.create(stockItem);
  }

  @Put('stock-item/:id')
  @ApiOkResponse({
    type: StockItem,
    description: 'Update stock item',
  })
  updateStockItem(
    @Body() stockItem: UpdateStockItemDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StockItem> {
    return this.stockItemsService.update(stockItem, id);
  }

  @Delete('stock-item/:id')
  @ApiOkResponse({
    type: StockItem,
    description: 'Delete soft stock item',
  })
  softDeleteStockItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StockItem> {
    return this.stockItemsService.softDelete(id);
  }
}
