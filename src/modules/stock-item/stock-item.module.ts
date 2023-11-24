import { Module } from '@nestjs/common';
import { StockItemsController } from './stock-item.controller';
import { StockItemsService } from './stock-item.service';
import { SequelizeModule } from '@nestjs/sequelize';
<<<<<<< HEAD
import { StockItem } from 'src/models/stock-item.model';
=======
import { StockItem } from 'src/models/stock-item.entity';
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1
import { InventoryModule } from '../inventory/inventory.module';
import { SupplyInvoiceModule } from '../supply-invoice/supply-invoice.module';
import { SaleItemModule } from '../sale-item/sale-item.module';

@Module({
  imports: [
    SequelizeModule.forFeature([StockItem]),
    InventoryModule,
    SupplyInvoiceModule,
    SaleItemModule,
  ],
  controllers: [StockItemsController],
  providers: [StockItemsService],
})
export class StockItemsModule {}
