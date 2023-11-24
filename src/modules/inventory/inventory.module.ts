import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Inventory } from 'src/models/inventory.model';

@Module({
  imports: [SequelizeModule.forFeature([Inventory])],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
