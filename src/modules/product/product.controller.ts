import {
  Controller,
  ParseIntPipe,
  ParseBoolPipe,
  Param,
  Query,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(
    @Query('includeDeleted', ParseBoolPipe) includeDelete: boolean = false,
  ) {
    return this.productService.findAll(includeDelete);
  }

  @Get(':id')
  getProductBuid(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findById(id);
  }

  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Put(':id')
  updateProduct(
    @Body() product: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productService.update(product, id);
  }

  @Delete(':id')
  softDeleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.softDelete(id);
  }
}
