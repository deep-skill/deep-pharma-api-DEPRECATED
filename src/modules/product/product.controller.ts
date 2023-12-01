import {
  Controller,
  ParseIntPipe,
<<<<<<< HEAD
  ParseBoolPipe,
=======
>>>>>>> 736706d16952af2c9994743f59debc6c2e517cc0
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
<<<<<<< HEAD
    @Query('includeDeleted') includeDeleted: boolean = false,
  ): Promise<Product[]> {
=======
    @Query('includeDeleted') includeDeleted = false,
  ): Promise<Product[]> {
    console.log('hello');

>>>>>>> 736706d16952af2c9994743f59debc6c2e517cc0
    return this.productService.findAll(includeDeleted);
  }

  @Get('product/:id')
  @ApiOkResponse({ type: Product })
<<<<<<< HEAD
  getProductByid(@Param('id', ParseIntPipe) id: number): Promise<Product> {
=======
  getProductByid(@Param('id') id: number): Promise<Product> {
>>>>>>> 736706d16952af2c9994743f59debc6c2e517cc0
    return this.productService.findById(id);
  }

  @Get('brand/:id/product')
  @ApiOkResponse({
    type: [Product],
<<<<<<< HEAD
    description: 'Products obtained by provider id',
=======
    description: 'Products obtained by brand id',
>>>>>>> 736706d16952af2c9994743f59debc6c2e517cc0
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

<<<<<<< HEAD
=======
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

>>>>>>> 736706d16952af2c9994743f59debc6c2e517cc0
  @Post('product')
  @ApiCreatedResponse({
    type: Product,
    description: 'Create product',
  })
  createProduct(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

<<<<<<< HEAD
  @Put('product:id')
=======
  @Put('product/:id')
>>>>>>> 736706d16952af2c9994743f59debc6c2e517cc0
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

<<<<<<< HEAD
  @Delete('product:id')
=======
  @Delete('product/:id')
>>>>>>> 736706d16952af2c9994743f59debc6c2e517cc0
  @ApiOkResponse({
    type: Product,
    description: 'Soft delete inventory',
  })
  softDeleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.softDelete(id);
  }
}
