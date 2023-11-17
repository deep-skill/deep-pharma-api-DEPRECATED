import {
    InternalServerErrorException,
    NotFoundException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/sequelize';
  import { Inventories } from 'src/models/inventory.model';
  import { CreateInventoryDto, UpdateInventoryDto } from './dtos/inventory.dto';
  import { Stock_items } from 'src/models/stock-item.model';
  // import { StockItemsService } from '../stock-items/stock-items.service';
  
  @Injectable()
  export class InventoryService {
    constructor(
      @InjectModel(Inventories) private inventoryModel: typeof Inventories,
      @InjectModel(Stock_items) private stockItemModel: typeof Stock_items, // private stockItemsService: StockItemsService,
    ) {}
  
    async findAll() {
      try {
        return this.inventoryModel.findAll({
          where: { deleted_at: null },
          include: [this.stockItemModel],
        });
      } catch (error) {
        return new InternalServerErrorException('Could not find inventories');
      }
    }
  
    async findOne(id: number) {
      try {
        const InventoryFound = await this.inventoryModel.findOne({
          where: {
            id,
          },
          include: [this.stockItemModel],
        });
  
        if (!InventoryFound) return new NotFoundException('Inventory not found');
  
        return InventoryFound;
      } catch (error) {
        return new InternalServerErrorException('Inventory not found');
      }
    }
  
    async create(inventory: CreateInventoryDto) {
      try {
        return this.inventoryModel.create({
          name: inventory.name,
        });
      } catch (error) {
        return new InternalServerErrorException('Inventory could not be created');
      }
    }
  
    async update(inventory: UpdateInventoryDto, id: number) {
      try {
        const [updatedRows] = await this.inventoryModel.update(inventory, {
          where: {
            id,
          },
        });
  
        if (updatedRows !== 1)
          return new NotFoundException('Inventory not found');
  
        return this.findOne(id);
      } catch (error) {
        return new InternalServerErrorException('Inventory could not be updated');
      }
    }
  
    async delete(id: number) {
      try {
        const [updatedRows] = await this.inventoryModel.update(
          { deleted_at: new Date() },
          {
            where: {
              id,
            },
          },
        );
  
        if (updatedRows !== 1)
          return new NotFoundException('Inventory not found');
  
        return {
          message: 'Inventory deleted successfully',
          status_code: HttpStatus.NO_CONTENT,
        };
      } catch (error) {
        return new InternalServerErrorException('Inventory could not be deleted');
      }
    }
  }
  