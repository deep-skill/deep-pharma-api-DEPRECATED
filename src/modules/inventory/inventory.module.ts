import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Inventory } from './entities/inventory.entity';
import { VenueModule } from '../venue/venue.module';

@Module({
  imports: [SequelizeModule.forFeature([Inventory]), VenueModule],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
