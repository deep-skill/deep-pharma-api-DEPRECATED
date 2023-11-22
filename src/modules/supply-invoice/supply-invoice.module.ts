import { Module } from '@nestjs/common';
import { SupplyInvoiceController } from './supply-invoice.controller';
import { SupplyInvoiceService } from './supply-invoice.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Supply_invoice } from 'src/models/supply-invoice.model';

@Module({
  imports: [SequelizeModule.forFeature([Supply_invoice])],
  controllers: [SupplyInvoiceController],
  providers: [SupplyInvoiceService],
})
export class SupplyInvoiceModule {}
