import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SaleItem } from '@/modules/sale-item/entities/sale-item.entity';
import { CreateSaleItemDto, UpdateSaleItemDto } from './dto/sale-item.dto';
import { ConcentrationUnitService } from '../concentration-unit/concentration-unit.service';

@Injectable()
export class SaleItemService {
  constructor(
    @InjectModel(SaleItem) private saleItemModel: typeof SaleItem,
    private readonly concentrationUnitService: ConcentrationUnitService,
  ) {}

  async findAll(includeDeleted: boolean): Promise<SaleItem[]> {
    try {
      if (includeDeleted) {
        return this.saleItemModel.findAll({
          paranoid: false,
        });
      }

      return this.saleItemModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to obtain sale items: ${error.message}`,
      );
    }
  }

  async findById(id: number): Promise<SaleItem> {
    const saleItem = await this.saleItemModel.findByPk(id, { paranoid: false });

    if (!saleItem) {
      throw new NotFoundException('Sale item not found');
    }

    try {
      return saleItem;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to obtain sale item: ${error.message}`,
      );
    }
  }

  async findByForeignKey(id: number): Promise<SaleItem[]> {
    const saleItems = await this.saleItemModel.findAll({
      where: {
        concentration_unit_id: id,
      },
    });

    if (!saleItems) {
      throw new NotFoundException('Sale items not found');
    }

    try {
      return saleItems;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to obtain sale items: ${error.message}`,
      );
    }
  }

  async create(saleItemData: CreateSaleItemDto) {
    const { label, description, concentration, concentrationUnitId } =
      saleItemData;

    await this.concentrationUnitService.findById(concentrationUnitId);

    try {
      const newSaleItem = await this.saleItemModel.create({
        label,
        description,
        concentration,
        concentration_unit_id: concentrationUnitId,
      });

      return newSaleItem;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create sale item: ${error.message}`,
      );
    }
  }

  async update(id: number, saleItemData: UpdateSaleItemDto): Promise<SaleItem> {
    const { label, description, concentration, concentrationUnitId } =
      saleItemData;

    const saleItem = await this.findById(id);

    if (concentrationUnitId) {
      await this.concentrationUnitService.findById(concentrationUnitId);
    }

    try {
      await saleItem.update({
        label,
        description,
        concentration,
        concentration_unit_id: concentrationUnitId,
      });
      return saleItem;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update sale item: ${error.message}`,
      );
    }
  }

  async softDelete(id: number): Promise<SaleItem> {
    const deletedSaleItem = await this.saleItemModel.destroy({
      where: { id },
    });

    if (!deletedSaleItem) {
      throw new NotFoundException('Sale item not found');
    }

    try {
      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete sale item: ${error.message}`,
      );
    }
  }
}
