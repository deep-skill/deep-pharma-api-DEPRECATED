import {
  InternalServerErrorException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SupplyInvoice } from 'src/models/supply-invoice.model';
import {
  CreateSupplyInvoiceDto,
  UpdateSupplyInvoiceDto,
} from './dto/supply-invoice.dto';
import { ProviderService } from '../provider/provider.service';

@Injectable()
export class SupplyInvoiceService {
  constructor(
    @InjectModel(SupplyInvoice)
    private supplyInvoiceModel: typeof SupplyInvoice,
    private readonly providerService: ProviderService,
  ) {}

  async findAll(includeDeleted: boolean) {
    try {
      if (includeDeleted) {
        return this.supplyInvoiceModel.findAll({
          paranoid: false,
        });
      }

      return this.supplyInvoiceModel.findAll();
    } catch (error) {
      return new InternalServerErrorException(
        `Could not find supply-invoices: ${error}`,
      );
    }
  }

  async findById(id: number): Promise<SupplyInvoice> {
    try {
      const supplyInvoiceFound = await this.supplyInvoiceModel.findByPk(id, {
        paranoid: false,
      });

      if (!supplyInvoiceFound)
        throw new NotFoundException(
          "The supply invoice id provided wasn't found",
        );

      return supplyInvoiceFound;
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not find supply-invoice: ${error}`,
      );
    }
  }

  async create(supplyInvoice: CreateSupplyInvoiceDto) {
    try {
      const { providerId, invoiceType, code, deliveredAt } = supplyInvoice;

      await this.providerService.findById(providerId);

      return this.supplyInvoiceModel.create({
        provider_id: providerId,
        invoice_type: invoiceType,
        code: code ?? null,
        delivered_at: deliveredAt ?? null,
      });
    } catch (error) {
      return new InternalServerErrorException(
        `Supply-invoice could not be created: ${error}`,
      );
    }
  }

  async update(supplyInvoice: UpdateSupplyInvoiceDto, id: number) {
    try {
      if (supplyInvoice.providerId) {
        await this.providerService.findById(supplyInvoice.providerId);
      }

      const [updatedRows] = await this.supplyInvoiceModel.update(
        supplyInvoice,
        {
          where: { id },
        },
      );

      if (updatedRows === 0)
        return new NotFoundException('Supply-invoice not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Supply-invoice could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number) {
    try {
      const deletedItems = await this.supplyInvoiceModel.destroy({
        where: { id },
      });

      if (deletedItems === 0)
        return new NotFoundException('Supply-invoice not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Supply-invoice could not be deleted: ${error}`,
      );
    }
  }
}
