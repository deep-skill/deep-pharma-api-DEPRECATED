import { Module } from '@nestjs/common';
import { StockItemsController } from './stock-item.controller';
import { StockItemsService } from './stock-item.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StockItem } from '@/modules/stock-item/entities/stock-item.entity';
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
