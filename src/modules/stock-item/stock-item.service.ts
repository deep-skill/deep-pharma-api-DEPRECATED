import {
  InternalServerErrorException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StockItem } from '@/modules/stock-item/entities/stock-item.entity';
import { CreateStockItemDto, UpdateStockItemDto } from './dto/stock-item.dto';
import { InventoryService } from '../inventory/inventory.service';
import { SupplyInvoiceService } from '../supply-invoice/supply-invoice.service';
import { SaleItemService } from '../sale-item/sale-item.service';

@Injectable()
export class StockItemService {
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

  async findAll(includeDeleted: boolean): Promise<StockItem[]> {
    try {
      if (includeDeleted) {
        return this.stockItemModel.findAll({
          paranoid: false,
        });
      }

      return this.stockItemModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not find stock-items: ${error.messages}`,
      );
    }
  }

  async findById(id: number): Promise<StockItem> {
    const stockItemFound = await this.stockItemModel.findByPk(id, {
      paranoid: false,
    });

    if (!stockItemFound)
      throw new NotFoundException("The stock item id provided wann't found");

    try {
      return stockItemFound;
    } catch (error) {
      throw new InternalServerErrorException(
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

  async create(stockItem: CreateStockItemDto): Promise<StockItem> {
    const {
      inventoryId,
      supplyInvoiceId,
      saleItemId,
      quantity,
      comment,
      expiresAt,
    } = stockItem;

    await this.inventoryService.findById(inventoryId);

    await this.supplyInvoiceService.findById(supplyInvoiceId);

    await this.saleItemService.findById(saleItemId);

    try {
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
      throw new InternalServerErrorException(
        `Stock-item could not be created: ${error.message}`,
      );
    }
  }

  async update(stockItem: UpdateStockItemDto, id: number): Promise<StockItem> {
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

    if (updatedRows === 0) throw new NotFoundException('Inventory not found');

    try {
      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Stock-item could not be updated: ${error.messages}`,
      );
    }
  }

  async softDelete(id: number): Promise<StockItem> {
    const updatedRows = await this.stockItemModel.destroy({
      where: { id },
    });

    if (updatedRows === 0) throw new NotFoundException('Inventory not found');

    try {
      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Stock-item could not be deleted: ${error}`,
      );
    }
  }
}
