import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand) private brandModel: typeof Brand) {}

  async findAll(includeDeleted: boolean): Promise<Brand[]> {
    try {
      if (includeDeleted) {
        return this.brandModel.findAll({
          paranoid: false,
        });
      }

      return this.brandModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException(`Could not find brands: ${error}`);
    }
  }

  async findById(id: number): Promise<Brand> {
    try {
      const brandFound = await this.brandModel.findByPk(id, {
        paranoid: false,
      });

      if (!brandFound)
        throw new NotFoundException("The brand id provided wasn't fount");

      return brandFound;
    } catch (error) {
      throw new InternalServerErrorException(`Could not find brand: ${error}`);
    }
  }

  async create(brand: CreateBrandDto): Promise<Brand> {
    try {
      const { name } = brand;

      return this.brandModel.create({
        name: name,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Brand could not be created: ${error}`,
      );
    }
  }

  async update(brand: UpdateBrandDto, id: number): Promise<Brand> {
    try {
      const [updatedRows] = await this.brandModel.update(brand, {
        where: { id },
      });

      if (updatedRows === 0) throw new NotFoundException('Brand not found');

      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Brand could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number): Promise<Brand> {
    try {
      const deletedRows = await this.brandModel.destroy({
        where: { id },
      });

      if (deletedRows === 0) throw new NotFoundException('Brand not found');

      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Brand could not be deleted: ${error}`,
      );
    }
  }
}
