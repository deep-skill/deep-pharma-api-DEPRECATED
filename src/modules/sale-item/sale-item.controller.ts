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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { SaleItemService } from './sale-item.service';
import { CreateSaleItemDto, UpdateSaleItemDto } from './dto/sale-item.dto';
import { SaleItem } from 'src/models/sale-item.entity';

@ApiTags('sale-item')
@Controller('sale-item')
export class SaleItemController {
  constructor(private readonly saleItemService: SaleItemService) {}

  @Get()
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted items',
  })
  @ApiOkResponse({ type: [SaleItem] })
  findAllSaleItems(
    @Query('includeDeleted') includeDeleted = false,
  ): Promise<SaleItem[]> {
    return this.saleItemService.findAll(includeDeleted);
  }

  @Get(':id')
  @ApiOkResponse({ type: [SaleItem] })
  findSaleItemById(@Param('id', ParseIntPipe) id: number): Promise<SaleItem> {
    return this.saleItemService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: SaleItem,
    description: 'Create sale item',
  })
  createSaleItem(@Body() saleItemData: CreateSaleItemDto): Promise<SaleItem> {
    return this.saleItemService.create(saleItemData);
  }

  @Put(':id')
  @ApiOkResponse({
    type: SaleItem,
    description: 'Update sale item',
  })
  updateSaleItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() saleItemData: UpdateSaleItemDto,
  ): Promise<SaleItem> {
    return this.saleItemService.update(id, saleItemData);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: SaleItem,
    description: 'Delete soft sale item',
  })
  softDeleteSaleItem(@Param('id', ParseIntPipe) id: number): Promise<SaleItem> {
    return this.saleItemService.softDelete(id);
  }
}
