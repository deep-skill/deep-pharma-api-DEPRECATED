import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PharmacistModule } from './pharmacist/pharmacist.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { InventoryModule } from './modules/inventory/inventory.module';
import { DatabaseModule } from './modules/database/database.module';
import { DrugstoreModule } from './modules/drugstore/drugstore.module';
import { VenueModule } from './modules/venue/venue.module';

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
    DatabaseModule,
    DrugstoreModule,
    VenueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
