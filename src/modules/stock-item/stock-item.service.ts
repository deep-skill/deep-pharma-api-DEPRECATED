import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/sequelize';
  import { Stock_items } from 'src/models/stock-item.model';
  import { CreateStockItemDto, UpdateStockItemDto } from './dtos/stock-items.dto';
  import { Inventories } from 'src/models/inventory.model';
  import { InventoryService } from '../inventory/inventory.service';
  
  @Injectable()
  export class StockItemsService {
    constructor(
      @InjectModel(Stock_items) private stockItemModel: typeof Stock_items,
    ) {}
  
    async findAll() {
      try {
        return this.stockItemModel.findAll({
          where: {
            deleted_at: null,
          },
        });
      } catch (error) {
        return new InternalServerErrorException('Could not find stock-items');
      }
    }
  
    async findOne(id: number) {
      try {
        const stockItemFound = await this.stockItemModel.findOne({
          where: {
            id,
          },
        });
  
        if (!stockItemFound) return new NotFoundException('Stock-item not found');
  
        return stockItemFound;
      } catch (error) {
        return new InternalServerErrorException('Stock-item not found');
      }
    }
  
    async create(stockItem: CreateStockItemDto) {
      try {
        return this.stockItemModel.create({
          inventory_id: stockItem.inventory_id,
          quantity: stockItem.quantity,
          comment: stockItem.comment ? stockItem.comment : null,
          expires_at: stockItem.expires_at ? stockItem.expires_at : null,
        });
      } catch (error) {
        return new InternalServerErrorException(
          'Stock-item could not be created',
        );
      }
    }
  
    async update(stockItem: UpdateStockItemDto, id: number) {
      try {
        const stockItemUpdated = await this.stockItemModel.update(stockItem, {
          where: {
            id,
          },
        });
  
        if (stockItemUpdated[0] !== 1)
          return new NotFoundException('Inventory not found');
  
        return this.findOne(id);
      } catch (error) {
        return new InternalServerErrorException(
          'Stock-item could not be updated',
        );
      }
    }
  
    async delete(id: number) {
      try {
        const stockItemDeleted = await this.stockItemModel.update(
          { deleted_at: null },
          {
            where: {
              id,
            },
          },
        );
  
        if (stockItemDeleted[0] !== 1)
          return new NotFoundException('Inventory not found');
  
        return {
          message: 'Stock-item deleted successfully',
          status_code: HttpStatus.NO_CONTENT,
        };
      } catch (error) {
        return new InternalServerErrorException(
          'Stock-item could not be deleted',
        );
      }
    }
  }