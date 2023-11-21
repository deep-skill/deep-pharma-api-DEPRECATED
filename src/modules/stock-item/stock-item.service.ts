import {
  BadRequestException,
  InternalServerErrorException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Stock_item } from 'src/models/stock-item.model';
import { CreateStockItemDto, UpdateStockItemDto } from './dto/stock-item.dto';

@Injectable()
export class StockItemsService {
  constructor(
    @InjectModel(Stock_item) private stockItemModel: typeof Stock_item,
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

  async create(stockItem: CreateStockItemDto) {
    try {
      const createdItem = await this.stockItemModel.create({
        inventory_id: stockItem.inventory_id,
        quantity: stockItem.quantity,
        comment: stockItem.comment ?? null,
        expires_at: stockItem.expires_at ?? null,
      });

      return createdItem;
    } catch (error) {
      return new InternalServerErrorException(
        `Stock-item could not be created: ${error}`,
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
