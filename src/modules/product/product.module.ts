import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '@/modules/product/entities/product.entity';
<<<<<<< HEAD
import { Tag } from '@/modules/tag/entities/tag.entity';
=======
>>>>>>> 736706d16952af2c9994743f59debc6c2e517cc0
import { ProductTag } from '@/modules/product/entities/product-tag.entity';
import { TagModule } from '../tag/tag.module';
import { BrandModule } from '../brand/brand.module';

@Module({
  imports: [
<<<<<<< HEAD
    SequelizeModule.forFeature([Product, Tag, ProductTag]),
=======
    SequelizeModule.forFeature([Product, ProductTag]),
>>>>>>> 736706d16952af2c9994743f59debc6c2e517cc0
    TagModule,
    BrandModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
<<<<<<< HEAD
=======
  exports: [ProductService],
>>>>>>> 736706d16952af2c9994743f59debc6c2e517cc0
})
export class ProductModule {}
