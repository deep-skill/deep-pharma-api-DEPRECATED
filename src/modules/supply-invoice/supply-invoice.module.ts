import { Module } from '@nestjs/common';
import { SupplyInvoiceController } from './supply-invoice.controller';
import { SupplyInvoiceService } from './supply-invoice.service';
import { SequelizeModule } from '@nestjs/sequelize';
<<<<<<< HEAD
import { SupplyInvoice } from 'src/models/supply-invoice.model';
import { ProviderModule } from '../provider/provider.module';

@Module({
  imports: [SequelizeModule.forFeature([SupplyInvoice]), ProviderModule],
=======
import { SupplyInvoice } from 'src/models/supply-invoice.entity';

@Module({
  imports: [SequelizeModule.forFeature([SupplyInvoice])],
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1
  controllers: [SupplyInvoiceController],
  providers: [SupplyInvoiceService],
  exports: [SupplyInvoiceService],
})
export class SupplyInvoiceModule {}
