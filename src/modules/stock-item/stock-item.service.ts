import {
  InternalServerErrorException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StockItem } from 'src/models/stock-item.model';
import { CreateStockItemDto, UpdateStockItemDto } from './dto/stock-item.dto';
import { InventoryService } from '../inventory/inventory.service';
import { SupplyInvoiceService } from '../supply-invoice/supply-invoice.service';
import { SaleItemService } from '../sale-item/sale-item.service';

@Injectable()
export class StockItemsService {
  private readonly foreignKeyMap = {
    inventoryId: 'inventory_id',
    supplyInvoiceId: 'supply_invoice_id',
    saleItemId: 'sale_item_id',
  };

  constructor(
    @InjectModel(StockItem) private stockItemModel: typeof StockItem,
    private readonly inventoryService: InventoryService,
    private readonly supplyInvoiceService: SupplyInvoiceService,
    private readonly saleItemService: SaleItemService,
  ) {}

  async findAll(includeDeleted: boolean) {
    try {
      if (includeDeleted) {
        return this.stockItemModel.findAll({
          paranoid: false,
        });
      }

      return this.stockItemModel.findAll();
    } catch (error) {
      return new InternalServerErrorException(
        `Could not find stock-items: ${error.messages}`,
      );
    }
  }

  async findById(id: number) {
    try {
      const stockItemFound = await this.stockItemModel.findByPk(id, {
        paranoid: false,
      });

      if (!stockItemFound)
        return new NotFoundException("The stock item id provided wann't found");

      return stockItemFound;
    } catch (error) {
      return new InternalServerErrorException(
        `Stock-item not found: ${error.messages}`,
      );
    }
  }

  async findByForeignKey(id: number, foreignKey: string): Promise<StockItem[]> {
    const mappedForeignKey = this.foreignKeyMap[foreignKey];

    if (!mappedForeignKey) {
      throw new BadRequestException('Invalid foreign key provided');
    }

    const stockItems = await this.stockItemModel.findAll({
      where: {
        [mappedForeignKey]: id,
      },
    });

    try {
      return stockItems;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to obtain stock items: ${error.message}`,
      );
    }
  }

  async create(stockItem: CreateStockItemDto) {
    const {
      inventoryId,
      supplyInvoiceId,
      saleItemId,
      quantity,
      comment,
      expiresAt,
    } = stockItem;

    try {
      await this.inventoryService.findById(inventoryId);

      await this.supplyInvoiceService.findById(supplyInvoiceId);

      await this.saleItemService.findById(saleItemId);

      const createdItem = await this.stockItemModel.create({
        inventory_id: inventoryId,
        supply_invoice_id: supplyInvoiceId,
        sale_item_id: saleItemId,
        quantity: quantity,
        comment: comment,
        expires_at: expiresAt,
      });

      return createdItem;
    } catch (error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new BadRequestException(error.message);
      }
      return new InternalServerErrorException(
        `Stock-item could not be created: ${error.message}`,
      );
    }
  }

  async update(stockItem: UpdateStockItemDto, id: number) {
    try {
      if (stockItem.inventoryId) {
        await this.inventoryService.findById(stockItem.inventoryId);
      }

      if (stockItem.supplyInvoiceId) {
        await this.supplyInvoiceService.findById(stockItem.supplyInvoiceId);
      }

      if (stockItem.saleItemId) {
        await this.saleItemService.findById(stockItem.saleItemId);
      }

      const [updatedRows] = await this.stockItemModel.update(stockItem, {
        where: {
          id,
        },
      });

      if (updatedRows === 0)
        return new NotFoundException('Inventory not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Stock-item could not be updated: ${error.messages}`,
      );
    }
  }

  async softDelete(id: number) {
    try {
      const updatedRows = await this.stockItemModel.destroy({
        where: { id },
      });

      if (updatedRows === 0)
        return new NotFoundException('Inventory not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Stock-item could not be deleted: ${error}`,
      );
    }
  }
}
