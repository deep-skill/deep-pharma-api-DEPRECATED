import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DrugstoreService } from './drugstore.service';
import { Drugstore } from 'src/models/drugstore.model';
import { CreateDrugstoreDto, UpdateDrugstoreDto } from './dto/drugstore.dto';

@Controller('drugstore')
export class DrugstoreController {
  constructor(private readonly drugstoreService: DrugstoreService) {}

  @Get()
  async findAll(
    @Query('includeDeleted') includeDeleted = false,
  ): Promise<Drugstore[]> {
    return this.drugstoreService.findAll(includeDeleted);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Drugstore> {
    return this.drugstoreService.findById(id);
  }

  @Post()
  async create(@Body() drugstoreData: CreateDrugstoreDto): Promise<Drugstore> {
    return this.drugstoreService.create(drugstoreData);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() drugstoreData: UpdateDrugstoreDto,
  ): Promise<Drugstore> {
    return this.drugstoreService.update(id, drugstoreData);
  }

  @Patch('delete/:id')
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<Drugstore> {
    return this.drugstoreService.softDelete(id);
  }

  @Delete(':id')
  async hardDelete(@Param('id', ParseIntPipe) id: number) {
    return this.drugstoreService.hardDelete(id);
  }
}
