import { InjectModel } from '@nestjs/sequelize';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'src/models/product.model';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductTag } from 'src/models/product-tag.model';
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
      const { name, description, prescriptionRequired, brandId, tagIds } =
        product;

      const verifyBrandId = await this.brandService.validateBrandId(brandId);
      if (!verifyBrandId)
        return new BadRequestException(
          'The brand id you have provided does not exit',
        );

      const verifyTagIds = await this.tagService.validateTagIds(tagIds);
      if (!verifyTagIds)
        return new BadRequestException(
          'One or more of the tag ids you have provided does not exit',
        );

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
