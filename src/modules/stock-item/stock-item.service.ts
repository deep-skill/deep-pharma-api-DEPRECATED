import {
  InternalServerErrorException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StockItem } from 'src/models/stock-item.entity';
import { CreateStockItemDto, UpdateStockItemDto } from './dto/stock-item.dto';

@Injectable()
export class StockItemsService {
  private readonly foreignKeyMap = {
    inventory_id: 'inventory_id',
    supply_invoice_id: 'supply_invoice_id',
    sale_item_id: 'sale_item_id',
  };

  constructor(
    @InjectModel(StockItem) private stockItemModel: typeof StockItem,
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
      const stockItemFound = await this.stockItemModel.findOne({
        where: {
          id,
        },
        paranoid: false,
      });

      if (!stockItemFound) return new NotFoundException('Stock-item not found');

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

  async create(stockItem: CreateStockItemDto): Promise<StockItem> {
    const {
      inventory_id,
      supply_invoice_id,
      sale_item_id,
      quantity,
      comment,
      expires_at,
    } = stockItem;

    try {
      const createdItem = await this.stockItemModel.create({
        inventory_id,
        supply_invoice_id,
        sale_item_id,
        quantity,
        comment,
        expires_at,
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

  async update(stockItem: UpdateStockItemDto, id: number) {
    try {
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
