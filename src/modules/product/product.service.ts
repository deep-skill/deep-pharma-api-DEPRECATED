import { InjectModel } from '@nestjs/sequelize';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@/modules/product/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductTag } from '@/modules/product/entities/product-tag.entity';
import { TagService } from '../tag/tag.service';
import { BrandService } from '../brand/brand.service';
import { Op } from 'sequelize';

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
    const productFound = await this.productModel.findByPk(id, {
      paranoid: false,
    });

    if (!productFound)
      throw new NotFoundException("The product id provided wasn't found");

    try {
      return productFound;
    } catch (error) {
      throw new InternalServerErrorException(`Product not found: ${error}`);
    }
  }

  async findProductsByBrandId(id: number): Promise<Product[]> {
    const products = await this.productModel.findAll({
      where: {
        brand_id: id,
      },
    });

    if (!products.length)
      throw new NotFoundException('Could not found products');
    try {
      return products;
    } catch (error) {
      throw new InternalServerErrorException(`Product not found: ${error}`);
    }
  }

  async findProductsByName(name: string): Promise<Product[]> {
    try {
      return this.productModel.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not find products: ${error}`,
      );
    }
  }

  async create(product: CreateProductDto): Promise<Product> {
    const { name, description, prescriptionRequired, brandId, tagIds } =
      product;

    if (tagIds) await this.tagService.validateTagIds(tagIds);

    await this.brandService.findById(brandId);

    try {
      const productCreated = await this.productModel.create({
        name: name,
        description: description ?? null,
        prescription_required: prescriptionRequired ?? null,
        brand_id: brandId,
      });

      if (tagIds) {
        for (const tagId of tagIds) {
          await this.productTagModel.create({
            products_id: productCreated.id,
            tags_id: tagId,
          });
        }
      }

      return productCreated;
    } catch (error) {
      throw new InternalServerErrorException(
        `Product could not be created: ${error}`,
      );
    }
  }

  async update(product: UpdateProductDto, productId: number): Promise<Product> {
    const { name, description, prescriptionRequired, brandId, tagIds } =
      product;

    if (tagIds) {
      await this.tagService.validateTagIds(tagIds);
    }

    if (brandId) {
      await this.brandService.findById(brandId);
    }

    const [updatedRows] = await this.productModel.update(
      {
        name: name,
        description: description,
        prescription_required: prescriptionRequired,
        brand_id: brandId,
      },
      {
        where: { id: productId },
      },
    );

    if (updatedRows === 0) throw new NotFoundException('Product not found');

    try {
      if (product.tagIds) {
        for (const tagId of product.tagIds) {
          await this.productTagModel.create({
            products_id: productId,
            tags_id: tagId,
          });
        }
      }

      return this.findById(productId);
    } catch (error) {
      throw new InternalServerErrorException(
        `Product could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number): Promise<Product> {
    const updatedRows = await this.productModel.destroy({
      where: { id },
    });

    if (updatedRows === 0) throw new NotFoundException('Product not found');

    try {
      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Faild to delete product: ${error}`,
      );
    }
  }
}
