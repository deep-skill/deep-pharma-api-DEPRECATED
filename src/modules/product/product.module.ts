import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/models/product.model';
import { Tag } from 'src/models/tag.model';
import { ProductTag } from 'src/models/product-tag.model';
import { TagModule } from '../tag/tag.module';
import { BrandModule } from '../brand/brand.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Tag, ProductTag]),
    TagModule,
    BrandModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
