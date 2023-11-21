import { Module } from '@nestjs/common';
import { StockItemsController } from './stock-item.controller';
import { StockItemsService } from './stock-item.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stock_item } from 'src/models/stock-item.model';
import { Inventory } from 'src/models/inventory.model';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [SequelizeModule.forFeature([Stock_item])],
  controllers: [StockItemsController],
  providers: [StockItemsService],
})
export class StockItemsModule {}
