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
import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  getBrands(@Query('includeDeleted') includeDeletd: boolean) {
    return this.brandService.findAll(includeDeletd);
  }

  @Get(':id')
  getBrandById(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.findById(id);
  }

  @Post()
  createBrand(@Body() brand: CreateBrandDto) {
    return this.brandService.create(brand);
  }

  @Put(':id')
  updateBrand(
    @Body() brand: UpdateBrandDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.brandService.update(brand, id);
  }

  @Delete(':id')
  softDeleteBrand(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.softDelete(id);
  }
}
