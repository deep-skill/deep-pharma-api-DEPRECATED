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

import {
  CreateConcentrationUnitDto,
  UpdateConcentrationUnitDto,
} from './dto/concentration-unit.dto';
import { ConcentrationUnitService } from './concentration-unit.service';
import { ConcentrationUnit } from 'src/models/concentration-unit.entity';

@ApiTags('concentration-unit')
@Controller('concentration-unit')
export class ConcentrationUnitController {
  constructor(
    private readonly concentrationUnitService: ConcentrationUnitService,
  ) {}

  @Get()
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted items',
  })
  @ApiOkResponse({ type: [ConcentrationUnit] })
  findAllConcentrationUnits(
    @Query('includeDeleted') includeDeleted = false,
  ): Promise<ConcentrationUnit[]> {
    return this.concentrationUnitService.findAll(includeDeleted);
  }

  @Get(':id')
  @ApiOkResponse({ type: ConcentrationUnit })
  findConcentrationUnitById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ConcentrationUnit> {
    return this.concentrationUnitService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: ConcentrationUnit,
    description: 'Create concentration unit',
  })
  createConcentrationUnit(
    @Body() concentrationUnitData: CreateConcentrationUnitDto,
  ): Promise<ConcentrationUnit> {
    return this.concentrationUnitService.create(concentrationUnitData);
  }

  @Put(':id')
  @ApiOkResponse({
    type: ConcentrationUnit,
    description: 'Update concentration unit',
  })
  updateConcentrationUnit(
    @Param('id', ParseIntPipe) id: number,
    @Body() concentrationUnitData: UpdateConcentrationUnitDto,
  ): Promise<ConcentrationUnit> {
    return this.concentrationUnitService.update(id, concentrationUnitData);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: ConcentrationUnit,
    description: 'Delete soft concentration unit',
  })
  softDeleteConcentrationUnit(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ConcentrationUnit> {
    return this.concentrationUnitService.softDelete(id);
  }
}
