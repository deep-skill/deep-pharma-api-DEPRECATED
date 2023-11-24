import {
  NotFoundException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Inventory } from 'src/models/inventory.entity';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory) private inventoryModel: typeof Inventory,
  ) {}

  async findAll(includeDeleted: boolean) {
    try {
      if (includeDeleted) {
        return this.inventoryModel.findAll({
          paranoid: false,
        });
      }

      return this.inventoryModel.findAll();
    } catch (error) {
      return new InternalServerErrorException(
        `Could not find inventories: ${error}`,
      );
    }
  }

  async findById(id: number) {
    try {
      const InventoryFound = await this.inventoryModel.findOne({
        where: {
          id,
        },
        paranoid: false,
      });

      if (!InventoryFound) return new NotFoundException('Inventory not found');

      return InventoryFound;
    } catch (error) {
      return new InternalServerErrorException(`Inventory not found: ${error}`);
    }
  }

  async create(inventory: CreateInventoryDto): Promise<Inventory> {
    try {
      return this.inventoryModel.create({
        venue_id: inventory.venue_id,
        name: inventory.name,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Inventory could not be created: ${error}`,
      );
    }
  }

  async update(inventory: UpdateInventoryDto, id: number) {
    try {
      const [updatedRows] = await this.inventoryModel.update(inventory, {
        where: {
          id,
        },
      });

      if (updatedRows === 0)
        return new NotFoundException('Inventory not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Inventory could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number) {
    try {
      const updatedRows = await this.inventoryModel.destroy({
        where: {
          id,
        },
      });

      if (updatedRows === 0)
        return new NotFoundException('Inventory not found');

      return await this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Faild to delete inventory: ${error}`,
      );
    }
  }
}
