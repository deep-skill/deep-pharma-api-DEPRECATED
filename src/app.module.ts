import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PharmacistModule } from './pharmacist/pharmacist.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { DatabaseModule } from './modules/database/database.module';
import { DrugstoreModule } from './modules/drugstore/drugstore.module';
import { VenueModule } from './modules/venue/venue.module';
import { SaleItemModule } from './modules/sale-item/sale-item.module';
import { ConcentrationUnitModule } from './modules/concentration-unit/concentration-unit.module';
import databaseConfig from './config/database.config';

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
    PharmacistModule,
    AdminModule,
    InventoryModule,
    UsersModule,
    DatabaseModule,
    DrugstoreModule,
    VenueModule,
    SaleItemModule,
    ConcentrationUnitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
