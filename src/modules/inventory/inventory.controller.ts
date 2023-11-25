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
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';
import { Inventory } from 'src/models/inventory.entity';

@ApiTags('inventory')
@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('inventory')
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted inventories',
  })
  @ApiOkResponse({ type: [Inventory] })
  getAllInventories(
    @Query('includeDeleted', ParseBoolPipe) includeDeleted: boolean = false,
  ) {
    return this.inventoryService.findAll(includeDeleted);
  }

  @Get('inventory/:id')
  @ApiOkResponse({ type: Inventory })
  getInventoryById(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.findById(id);
  }

  @Get('venue/:id/inventory')
  @ApiOkResponse({
    type: [Inventory],
    description: 'Inventories obtained by venue id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'Find by venue id',
  })
  getInventoryByVenueId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Inventory[]> {
    return this.inventoryService.findInventoriesByVenueId(id);
  }

  @Post('inventory')
  @ApiCreatedResponse({
    type: Inventory,
    description: 'Create inventory',
  })
  createInventory(@Body() inventory: CreateInventoryDto): Promise<Inventory> {
    return this.inventoryService.create(inventory);
  }

  @Put('inventory:id')
  @ApiOkResponse({
    type: Inventory,
    description: 'Update inventory',
  })
  updateInventory(
    @Body() inventory: UpdateInventoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.inventoryService.update(inventory, id);
  }

  @Delete('inventory:id')
  @ApiOkResponse({
    type: Inventory,
    description: 'Delete soft inventory',
  })
  softDeleteInventory(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.softDelete(id);
  }
}
