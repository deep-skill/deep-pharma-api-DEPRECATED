import { Module } from '@nestjs/common';
import { SupplyInvoiceController } from './supply-invoice.controller';
import { SupplyInvoiceService } from './supply-invoice.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SupplyInvoice } from './entities/supply-invoice.entity';
import { ProviderModule } from '../provider/provider.module';

@Module({
  imports: [SequelizeModule.forFeature([SupplyInvoice]), ProviderModule],
  controllers: [SupplyInvoiceController],
  providers: [SupplyInvoiceService],
  exports: [SupplyInvoiceService],
})
export class SupplyInvoiceModule {}
