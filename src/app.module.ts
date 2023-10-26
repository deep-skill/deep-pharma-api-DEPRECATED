import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PharmacistModule } from './pharmacist/pharmacist.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    PharmacistModule,
    AdminModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
