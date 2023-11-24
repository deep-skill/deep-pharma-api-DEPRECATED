import { Module } from '@nestjs/common';
import { SupplyInvoiceController } from './supply-invoice.controller';
import { SupplyInvoiceService } from './supply-invoice.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SupplyInvoice } from 'src/models/supply-invoice.entity';

@Module({
  imports: [SequelizeModule.forFeature([SupplyInvoice])],
  controllers: [SupplyInvoiceController],
  providers: [SupplyInvoiceService],
})
export class SupplyInvoiceModule {}
