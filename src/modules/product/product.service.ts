import { InjectModel } from '@nestjs/sequelize';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductTag } from 'src/models/product-tag.entity';
import { TagService } from '../tag/tag.service';
import { BrandService } from '../brand/brand.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(ProductTag) private productTagModel: typeof ProductTag,
    private readonly tagService: TagService,
    private readonly brandService: BrandService,
  ) {}

  async findAll(includeDeleted: boolean): Promise<Product[]> {
    try {
      if (includeDeleted) {
        return this.productModel.findAll({
          paranoid: false,
        });
      }

      return this.productModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not find products: ${error}`,
      );
    }
  }

  async findById(id: number): Promise<Product> {
    try {
      const productFound = await this.productModel.findByPk(id, {
        paranoid: false,
      });

      if (!productFound) throw new NotFoundException('Product not found');

      return productFound;
    } catch (error) {
      throw new InternalServerErrorException(`Product not found: ${error}`);
    }
  }

  async findProductsByBrandId(id: number): Promise<Product[]> {
    try {
      const products = await this.productModel.findAll({
        where: {
          brand_id: id,
        },
      });

      if (!products.length)
        throw new NotFoundException('Could not found products');

      return products;
    } catch (error) {
      throw new InternalServerErrorException(`Product not found: ${error}`);
    }
  }

  async create(product: CreateProductDto): Promise<Product> {
    try {
      const { name, description, prescriptionRequired, brandId, tagIds } =
        product;

      if (tagIds.length) await this.tagService.validateTagIds(tagIds);

      await this.brandService.findById(brandId);

      const productCreated = await this.productModel.create({
        name: name,
        description: description ?? null,
        prescription_required: prescriptionRequired ?? null,
        brand_id: brandId,
      });

      for (const tagId of tagIds) {
        await this.productTagModel.create({
          products_id: productCreated.id,
          tags_id: tagId,
        });
      }

      return productCreated;
    } catch (error) {
      throw new InternalServerErrorException(
        `Product could not be created: ${error}`,
      );
    }
  }

  async update(product: UpdateProductDto, id: number): Promise<Product> {
    try {
      if (product.tagIds) {
        await this.tagService.validateTagIds(product.tagIds);
      }

      if (product.brandId) {
        await this.brandService.findById(product.brandId);
      }

      const [updatedRows] = await this.productModel.update(product, {
        where: { id },
      });

      if (updatedRows === 0) throw new NotFoundException('Product not found');

      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Product could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number): Promise<Product> {
    try {
      const updatedRows = await this.productModel.destroy({
        where: { id },
      });

      if (updatedRows === 0) throw new NotFoundException('Product not found');

      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Faild to delete product: ${error}`,
      );
    }
  }
}
