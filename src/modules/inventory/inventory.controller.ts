import {
  Controller,
  ParseIntPipe,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from './dtos/inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getInventories() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  getInventoryById(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.findOne(id);
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
  deleteInventory(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.delete(id);
  }
}