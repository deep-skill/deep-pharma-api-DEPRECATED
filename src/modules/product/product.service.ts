import { InjectModel } from '@nestjs/sequelize';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'src/models/product.model';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductTag } from 'src/models/product-tag.model';
import { TagService } from '../tag/tag.service';
import { Tag } from 'src/models/tag.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(ProductTag) private productTagModel: typeof ProductTag,
    private readonly tagService: TagService,
  ) {}

  async findAll(includeDeleted: boolean) {
    try {
      if (includeDeleted) {
        return this.productModel.findAll({
          paranoid: false,
        });
      }

      return this.productModel.findAll();
    } catch (error) {
      return new InternalServerErrorException(
        `Could not find products: ${error}`,
      );
    }
  }

  async findById(id: number) {
    try {
      const productFound = await this.productModel.findOne({
        where: { id },
        paranoid: false,
      });

      if (!productFound) return new NotFoundException('Product not found');

      return productFound;
    } catch (error) {
      return new InternalServerErrorException(`Product not found: ${error}`);
    }
  }

  async create(product: CreateProductDto) {
    try {
      const tagFound = await this.tagService.findById(product.tag_id);

      const productCreated = await this.productModel.create({
        name: product.name,
        description: product.description ?? null,
        prescription_required: product.prescription_required ?? null,
        brand_id: product.brand_id,
      });

      if (tagFound instanceof Tag) {
        await this.productTagModel.create({
          products_id: productCreated.id,
          tags_id: tagFound.id,
        });
      }

      return productCreated;
    } catch (error) {
      return new InternalServerErrorException(
        `Product could not be created: ${error}`,
      );
    }
  }

  async update(product: UpdateProductDto, id: number) {
    try {
      const [updatedRows] = await this.productModel.update(product, {
        where: { id },
      });

      if (updatedRows === 0) return new NotFoundException('Product not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Product could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number) {
    try {
      const updatedRows = await this.productModel.destroy({
        where: { id },
      });

      if (updatedRows === 0) return new NotFoundException('Product not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Faild to delete product: ${error}`,
      );
    }
  }
}
