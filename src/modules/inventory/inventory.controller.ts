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

import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';
import { Inventory } from '@/modules/inventory/entities/inventory.entity';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
<<<<<<< HEAD
  getInventories(
    @Query('includeDeleted', ParseBoolPipe) includeDeleted: boolean,
  ) {
=======
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted items',
  })
  @ApiOkResponse({ type: [Inventory] })
  getAllInventories(@Query('includeDeleted') includeDeleted: boolean) {
>>>>>>> 39251dace816d295f209d486fc4713fce4a1fce6
    return this.inventoryService.findAll(includeDeleted);
  }

  @Get(':id')
  @ApiOkResponse({ type: Inventory })
  getInventoryById(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: Inventory,
    description: 'Create inventory',
  })
  createInventory(@Body() inventory: CreateInventoryDto): Promise<Inventory> {
    return this.inventoryService.create(inventory);
  }

  @Put(':id')
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

  @Delete(':id')
  @ApiOkResponse({
    type: Inventory,
    description: 'Delete soft inventory',
  })
  softDeleteInventory(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.softDelete(id);
  }
}
