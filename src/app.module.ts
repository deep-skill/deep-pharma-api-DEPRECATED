import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from './config/database.config';
import { AdminModule } from './admin/admin.module';
import { ConcentrationUnitModule } from './modules/concentration-unit/concentration-unit.module';
import { DatabaseModule } from './modules/database/database.module';
import { DrugstoreModule } from './modules/drugstore/drugstore.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ProviderModule } from './modules/provider/provider.module';
import { SaleItemModule } from './modules/sale-item/sale-item.module';
import { StockItemModule } from './modules/stock-item/stock-item.module';
import { SupplyInvoiceModule } from './modules/supply-invoice/supply-invoice.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';
import { TagModule } from './modules/tag/tag.module';
import { VenueModule } from './modules/venue/venue.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
    ]),
    AdminModule,
    ConcentrationUnitModule,
    DatabaseModule,
    DrugstoreModule,
    InventoryModule,
    ProviderModule,
    SaleItemModule,
    StockItemModule,
    SupplyInvoiceModule,
    ProductModule,
    BrandModule,
    TagModule,
    VenueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
