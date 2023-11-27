import { Module } from '@nestjs/common';
import { SaleItemService } from './sale-item.service';
import { SaleItemController } from './sale-item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SaleItem } from '@/modules/sale-item/entities/sale-item.entity';
import { ConcentrationUnitModule } from '../concentration-unit/concentration-unit.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    SequelizeModule.forFeature([SaleItem]),
    ConcentrationUnitModule,
    ProductModule,
  ],
  controllers: [SaleItemController],
  providers: [SaleItemService],
  exports: [SaleItemService],
})
export class SaleItemModule {}
