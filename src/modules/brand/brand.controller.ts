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
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Brand } from 'src/models/brand.entity';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted brands',
  })
  @ApiOkResponse({ type: [Brand] })
  getBrands(
    @Query('includeDeleted', ParseBoolPipe) includeDeletd: boolean = false,
  ): Promise<Brand[]> {
    return this.brandService.findAll(includeDeletd);
  }

  @Get(':id')
  @ApiOkResponse({ type: Brand })
  getBrandById(@Param('id', ParseIntPipe) id: number): Promise<Brand> {
    return this.brandService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: Brand,
    description: 'Create brand',
  })
  createBrand(@Body() brand: CreateBrandDto): Promise<Brand> {
    return this.brandService.create(brand);
  }

  @Put(':id')
  @ApiOkResponse({
    type: Brand,
    description: 'Update brand',
  })
  updateBrand(
    @Body() brand: UpdateBrandDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Brand> {
    return this.brandService.update(brand, id);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: Brand,
    description: 'Delete soft brand',
  })
  softDeleteBrand(@Param('id', ParseIntPipe) id: number): Promise<Brand> {
    return this.brandService.softDelete(id);
  }
}
