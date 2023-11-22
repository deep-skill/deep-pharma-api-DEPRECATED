import { Module } from '@nestjs/common';
import { SaleItemService } from './sale-item.service';
import { SaleItemController } from './sale-item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SaleItem } from 'src/models/sale-item.model';
import { ConcentrationUnitModule } from '../concentration-unit/concentration-unit.module';

@Module({
  imports: [SequelizeModule.forFeature([SaleItem]), ConcentrationUnitModule],
  controllers: [SaleItemController],
  providers: [SaleItemService],
})
export class SaleItemModule {}
