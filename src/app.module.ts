import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PharmacistModule } from './pharmacist/pharmacist.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { InventoryModule } from './modules/inventory/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PharmacistModule,
    AdminModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
    ]),
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
