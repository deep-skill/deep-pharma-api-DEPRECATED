import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from 'src/models/brand.model';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import { Product } from 'src/models/product.model';
import { Tag } from 'src/models/tag.model';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand) private brandModel: typeof Brand) {}

  async findAll(includeDeleted: boolean) {
    try {
      if (includeDeleted) {
        return this.brandModel.findAll({
          paranoid: false,
        });
      }

      return this.brandModel.findAll();
    } catch (error) {
      return new InternalServerErrorException(
        `Could not find brands: ${error}`,
      );
    }
  }

  async findById(id: number) {
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

  async create(brand: CreateBrandDto) {
    try {
      const { name } = brand;

      return this.brandModel.create({
        name: name,
      });
    } catch (error) {
      return new InternalServerErrorException(
        `Brand could not be created: ${error}`,
      );
    }
  }

  async update(brand: UpdateBrandDto, id: number) {
    try {
      const [updatedRows] = await this.brandModel.update(brand, {
        where: { id },
      });

      if (updatedRows === 0) return new NotFoundException('Brand not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Brand could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number) {
    try {
      const deletedRows = await this.brandModel.destroy({
        where: { id },
      });

      if (deletedRows === 0) return new NotFoundException('Brand not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Brand could not be deleted: ${error}`,
      );
    }
  }
}
