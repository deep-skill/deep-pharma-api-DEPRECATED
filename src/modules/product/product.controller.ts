import {
  Controller,
  ParseIntPipe,
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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from '@/modules/product/entities/product.entity';

@ApiTags('product')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('product')
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted products',
  })
  @ApiOkResponse({ type: [Product] })
  getAllProducts(
    @Query('includeDeleted') includeDeleted = false,
  ): Promise<Product[]> {
    console.log('hello');

    return this.productService.findAll(includeDeleted);
  }

  @Get('product/:id')
  @ApiOkResponse({ type: Product })
  getProductByid(@Param('id') id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Get('brand/:id/product')
  @ApiOkResponse({
    type: [Product],
    description: 'Products obtained by brand id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'Foreign key id',
  })
  getProductByForeignKey(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product[]> {
    return this.productService.findProductsByBrandId(id);
  }

  @Get('product/name/:name')
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    description: 'Find products by name',
  })
  @ApiOkResponse({
    type: [Product],
    description: 'Products obtained by name',
  })
  getProductsByName(@Param('name') name: string): Promise<Product[]> {
    return this.productService.findProductsByName(name);
  }

  @Post('product')
  @ApiCreatedResponse({
    type: Product,
    description: 'Create product',
  })
  createProduct(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Put('product/:id')
  @ApiOkResponse({
    type: Product,
    description: 'Update product',
  })
  updateProduct(
    @Body() product: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productService.update(product, id);
  }

  @Delete('product/:id')
  @ApiOkResponse({
    type: Product,
    description: 'Soft delete inventory',
  })
  softDeleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.softDelete(id);
  }
}
