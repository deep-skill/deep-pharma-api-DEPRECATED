import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { DrugstoreService } from './drugstore.service';
import { Drugstore } from 'src/models/drugstore.entity';
import { CreateDrugstoreDto, UpdateDrugstoreDto } from './dto/drugstore.dto';

@ApiTags('drugstore')
@Controller('drugstore')
export class DrugstoreController {
  constructor(private readonly drugstoreService: DrugstoreService) {}

  @Get()
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted items',
  })
  @ApiOkResponse({ type: [Drugstore] })
  async getAllDrugstores(
    @Query('includeDeleted') includeDeleted = false,
  ): Promise<Drugstore[]> {
    return this.drugstoreService.findAll(includeDeleted);
  }

  @Get(':id')
  @ApiOkResponse({ type: Drugstore })
  async getDrugstoreById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Drugstore> {
    return this.drugstoreService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: Drugstore,
    description: 'Create drugstore',
  })
  async createDrugstore(
    @Body() drugstoreData: CreateDrugstoreDto,
  ): Promise<Drugstore> {
    return this.drugstoreService.create(drugstoreData);
  }

  @Put(':id')
  @ApiOkResponse({
    type: Drugstore,
    description: 'Update drugstore',
  })
  async updateDrugstore(
    @Param('id', ParseIntPipe) id: number,
    @Body() drugstoreData: UpdateDrugstoreDto,
  ): Promise<Drugstore> {
    return this.drugstoreService.update(id, drugstoreData);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: Drugstore,
    description: 'Delete soft drugstore',
  })
  async softDeleteDrugstore(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Drugstore> {
    return this.drugstoreService.softDelete(id);
  }
}
