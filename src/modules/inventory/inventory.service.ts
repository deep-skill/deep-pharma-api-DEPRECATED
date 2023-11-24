import {
  NotFoundException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Inventory } from 'src/models/inventory.model';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory) private inventoryModel: typeof Inventory,
  ) {}

  async findAll(includeDeleted: boolean): Promise<Inventory[]> {
    try {
      if (includeDeleted) {
        return this.inventoryModel.findAll({
          paranoid: false,
        });
      }

      return this.inventoryModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not find inventories: ${error}`,
      );
    }
  }

  async findById(id: number): Promise<Inventory> {
    try {
      const inventoryFound = await this.inventoryModel.findByPk(id, {
        paranoid: false,
      });

      if (!inventoryFound)
        throw new NotFoundException("The inventory id provided wasn't found");

      return inventoryFound;
    } catch (error) {
      throw new InternalServerErrorException(`Inventory not found: ${error}`);
    }
  }

  async create(inventory: CreateInventoryDto): Promise<Inventory> {
    try {
      const {
        // venueId,
        name,
      } = inventory;

      return this.inventoryModel.create({
        // venue_id: venueId,
        name: name ?? null,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Inventory could not be created: ${error}`,
      );
    }
  }

  async update(inventory: UpdateInventoryDto, id: number): Promise<Inventory> {
    try {
      const [updatedRows] = await this.inventoryModel.update(inventory, {
        where: {
          id,
        },
      });

      if (updatedRows === 0) throw new NotFoundException('Inventory not found');

      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Inventory could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number): Promise<Inventory> {
    try {
      const updatedRows = await this.inventoryModel.destroy({
        where: {
          id,
        },
      });

      if (updatedRows === 0) throw new NotFoundException('Inventory not found');

      return await this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Faild to delete inventory: ${error}`,
      );
    }
  }
}
