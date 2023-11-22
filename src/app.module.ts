import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PharmacistModule } from './pharmacist/pharmacist.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { InventoryModule } from './modules/inventory/inventory.module';
import { StockItemsModule } from './modules/stock-item/stock-item.module';
import { DatabaseModule } from './modules/database/database.module';
import { DrugstoreModule } from './modules/drugstore/drugstore.module';
import { VenueModule } from './modules/venue/venue.module';
import { ProviderModule } from './modules/provider/provider.module';
import { SupplyInvoiceModule } from './modules/supply-invoice/supply-invoice.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
    ]),
    PharmacistModule,
    AdminModule,
    InventoryModule,
    StockItemsModule,
    DatabaseModule,
    DrugstoreModule,
    VenueModule,
    ProviderModule,
    SupplyInvoiceModule,
    ProductModule,
    BrandModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
