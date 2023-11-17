import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Inventories } from 'src/models/inventory.model';
import { Stock_items } from 'src/models/stock-item.model';

@Module({
  imports: [SequelizeModule.forFeature([Inventories, Stock_items])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
