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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from 'src/models/product.entity';

@ApiTags('product')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('jhfgskjdhfgdfhx')
  // @ApiQuery({
  //   name: 'includeDeleted',
  //   required: false,
  //   type: 'boolean',
  //   description: 'Include deleted products',
  // })
  // @ApiOkResponse({ type: [Product] })
  getAllProducts() // @Query('includeDeleted') includeDeleted: boolean = false,
  : Promise<Product[]> {
    return this.productService.findAll(false);
  }

  // @Get('product/:id')
  // @ApiOkResponse({ type: Product })
  // getProductByid(@Param('id', ParseIntPipe) id: number): Promise<Product> {
  //   return this.productService.findById(id);
  // }

  // @Get('brand/:id/product')
  // @ApiOkResponse({
  //   type: [Product],
  //   description: 'Products obtained by provider id',
  // })
  // @ApiParam({
  //   name: 'id',
  //   required: true,
  //   type: 'string',
  //   description: 'Foreign key id',
  // })
  // getProductByForeignKey(
  //   @Param('id', ParseIntPipe) id: number,
  // ): Promise<Product[]> {
  //   return this.productService.findProductsByBrandId(id);
  // }

  // @Post('product')
  // @ApiCreatedResponse({
  //   type: Product,
  //   description: 'Create product',
  // })
  // createProduct(@Body() product: CreateProductDto) {
  //   return this.productService.create(product);
  // }

  // @Put('product:id')
  // @ApiOkResponse({
  //   type: Product,
  //   description: 'Update product',
  // })
  // updateProduct(
  //   @Body() product: UpdateProductDto,
  //   @Param('id', ParseIntPipe) id: number,
  // ) {
  //   return this.productService.update(product, id);
  // }

  // @Delete('product:id')
  // @ApiOkResponse({
  //   type: Product,
  //   description: 'Soft delete inventory',
  // })
  // softDeleteProduct(@Param('id', ParseIntPipe) id: number) {
  //   return this.productService.softDelete(id);
  // }
}
