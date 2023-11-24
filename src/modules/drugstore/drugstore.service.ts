import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Drugstore } from '@/modules/drugstore/entities/drugstore.entity';
import { CreateDrugstoreDto, UpdateDrugstoreDto } from './dto/drugstore.dto';

@Injectable()
export class DrugstoreService {
  constructor(
    @InjectModel(Drugstore) private drugstoreModel: typeof Drugstore,
  ) {}

  async findAll(includeDeleted: boolean): Promise<Drugstore[]> {
    try {
      if (includeDeleted) {
        return this.drugstoreModel.findAll();
      }

      return this.drugstoreModel.findAll({
        where: {
          deleted_at: null,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to obtain drugstores: ${error.message}`,
      );
    }
  }

  async findById(id: number): Promise<Drugstore> {
    const drugstore = await this.drugstoreModel.findByPk(id, {
      paranoid: false,
    });

    if (!drugstore) {
      throw new NotFoundException('Drugstore not found');
    }
    try {
      return drugstore;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to obtain drugstore: ${error.message}`,
      );
    }
  }

  async create(drugstoreData: CreateDrugstoreDto): Promise<Drugstore> {
    try {
      const { RUC, legalName, commercialName, logo } = drugstoreData;

      const newDrugstore = await this.drugstoreModel.create({
        RUC,
        legal_name: legalName,
        commercial_name: commercialName,
        logo,
      });

      return newDrugstore;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException(
          'Drugstore with this legal name or RUC already exists',
        );
      }

      throw new InternalServerErrorException(
        `Failed to create drugstore: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    drugstoreData: UpdateDrugstoreDto,
  ): Promise<Drugstore> {
    const drugstore = await this.findById(id);

    if (!drugstore) {
      throw new NotFoundException('Drugstore not found');
    }

    try {
      const { RUC, legalName, commercialName, logo } = drugstoreData;

      await drugstore.update({
        RUC,
        legal_name: legalName,
        commercial_name: commercialName,
        logo,
      });
      return drugstore;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update drugstore: ${error.message}`,
      );
    }
  }

  async softDelete(id: number): Promise<Drugstore> {
    const deletedDrugstore = await this.drugstoreModel.destroy({
      where: { id },
    });

    if (deletedDrugstore === 0) {
      throw new NotFoundException('Drugstore not found');
    }

    try {
      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete drugstore: ${error.message}`,
      );
    }
  }
}
