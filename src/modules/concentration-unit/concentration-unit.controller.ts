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
import { ConcentrationUnitService } from './concentration-unit.service';
import { ConcentrationUnit } from 'src/models/concentration-unit.model';
import {
  CreateConcentrationUnitDto,
  UpdateConcentrationUnitDto,
} from './dto/concentration-unit.dto';

@Controller('concentration-unit')
export class ConcentrationUnitController {
  constructor(
    private readonly concentrationUnitService: ConcentrationUnitService,
  ) {}

  @Get()
  findAllConcentrationUnits(
    @Query('includeDeleted') includeDeleted = false,
  ): Promise<ConcentrationUnit[]> {
    return this.concentrationUnitService.findAll(includeDeleted);
  }

  @Get(':id')
  findConcentrationUnitById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ConcentrationUnit> {
    return this.concentrationUnitService.findById(id);
  }

  @Post()
  createConcentrationUnit(
    @Body() concentrationUnitData: CreateConcentrationUnitDto,
  ): Promise<ConcentrationUnit> {
    return this.concentrationUnitService.create(concentrationUnitData);
  }

  @Put(':id')
  updateConcentrationUnit(
    @Param('id', ParseIntPipe) id: number,
    @Body() concentrationUnitData: UpdateConcentrationUnitDto,
  ): Promise<ConcentrationUnit> {
    return this.concentrationUnitService.update(id, concentrationUnitData);
  }

  @Delete(':id')
  softDeleteConcentrationUnit(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ConcentrationUnit> {
    return this.concentrationUnitService.softDelete(id);
  }
}
