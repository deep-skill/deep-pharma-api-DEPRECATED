import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '@/modules/product/entities/product.entity';
import { ProductTag } from '@/modules/product/entities/product-tag.entity';
import { TagModule } from '../tag/tag.module';
import { BrandModule } from '../brand/brand.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, ProductTag]),
    TagModule,
    BrandModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
