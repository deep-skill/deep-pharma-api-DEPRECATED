import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConcentrationUnit } from 'src/models/concentration-unit.entity';
import {
  CreateConcentrationUnitDto,
  UpdateConcentrationUnitDto,
} from './dto/concentration-unit.dto';

@Injectable()
export class ConcentrationUnitService {
  constructor(
    @InjectModel(ConcentrationUnit)
    private ConcentrationUnitModel: typeof ConcentrationUnit,
  ) {}

  async findAll(includeDeleted: boolean): Promise<ConcentrationUnit[]> {
    try {
      if (includeDeleted) {
        return this.ConcentrationUnitModel.findAll({
          paranoid: false,
        });
      }

      return this.ConcentrationUnitModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to obtain concentration units: ${error.message}`,
      );
    }
  }

  async findById(id: number): Promise<ConcentrationUnit> {
    const concentrationUnit = await this.ConcentrationUnitModel.findByPk(id, {
      paranoid: false,
    });

    if (!concentrationUnit) {
      throw new NotFoundException('Concentration unit not found');
    }

    try {
      return concentrationUnit;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to obtain concentration unit: ${error.message}`,
      );
    }
  }

  async create(concentrationUnitData: CreateConcentrationUnitDto) {
    try {
      const { name } = concentrationUnitData;

      const newConcentrationUnit = await this.ConcentrationUnitModel.create({
        name,
      });

      return newConcentrationUnit;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException(
          'Concentration unit with this name already exists',
        );
      }

      throw new InternalServerErrorException(
        `Failed to create concentration unit: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    concentrationUnitData: UpdateConcentrationUnitDto,
  ): Promise<ConcentrationUnit> {
    const concentrationUnit = await this.findById(id);

    try {
      await concentrationUnit.update(concentrationUnitData);
      return concentrationUnit;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update concentration unit: ${error.message}`,
      );
    }
  }

  async softDelete(id: number): Promise<ConcentrationUnit> {
    const deletedConcentrationUnit = await this.ConcentrationUnitModel.destroy({
      where: { id },
    });

    if (!deletedConcentrationUnit) {
      throw new NotFoundException('Concentration unit not found');
    }

    try {
      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete concentration unit: ${error.message}`,
      );
    }
  }
}
