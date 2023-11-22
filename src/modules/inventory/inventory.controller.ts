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
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getInventories() {
    return this.inventoryService.findAll(false);
  }

  @Get()
  getInventoriesIncludingDeleted(
    @Query('includeDeleted', ParseBoolPipe) includeDeleted: boolean,
  ) {
    return this.inventoryService.findAll(includeDeleted);
  }

  @Get(':id')
  getInventoryById(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.findById(id);
  }

  @Post()
  createInventory(@Body() inventory: CreateInventoryDto) {
    return this.inventoryService.create(inventory);
  }

  @Put(':id')
  updateInventory(
    @Body() inventory: UpdateInventoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.inventoryService.update(inventory, id);
  }

  @Delete(':id')
  softDeleteInventory(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.softDelete(id);
  }
}
