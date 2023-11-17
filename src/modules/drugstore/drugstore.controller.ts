import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  async getAllDrugstores(
    @Query('includeDeleted') includeDeleted = false,
  ): Promise<Drugstore[]> {
    return this.drugstoreService.findAll(includeDeleted);
  }

  @Get(':id')
  async getDrugstoreById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Drugstore> {
    return this.drugstoreService.findById(id);
  }

  @Post()
  async createDrugstore(
    @Body() drugstoreData: CreateDrugstoreDto,
  ): Promise<Drugstore> {
    return this.drugstoreService.create(drugstoreData);
  }

  @Put(':id')
  async updateDrugstore(
    @Param('id', ParseIntPipe) id: number,
    @Body() drugstoreData: UpdateDrugstoreDto,
  ): Promise<Drugstore> {
    return this.drugstoreService.update(id, drugstoreData);
  }

  @Patch(':id')
  async softDeleteDrugstore(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Drugstore> {
    return this.drugstoreService.softDelete(id);
  }

  @Delete('hardDelete/:id')
  async hardDeleteDrugstore(@Param('id', ParseIntPipe) id: number) {
    return this.drugstoreService.hardDelete(id);
  }
}
