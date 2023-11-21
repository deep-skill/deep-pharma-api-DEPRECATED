import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Drugstore } from 'src/models/drugstore.model';
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
    const drugstore = await this.drugstoreModel.findByPk(id);

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
      const { RUC, legal_name, commercial_name, logo } = drugstoreData;

      const newDrugstore = await this.drugstoreModel.create({
        RUC,
        legal_name,
        commercial_name,
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
      await drugstore.update(drugstoreData);
      return drugstore;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update drugstore: ${error.message}`,
      );
    }
  }

  async softDelete(id: number): Promise<Drugstore> {
    const drugstore = await this.findById(id);

    if (!drugstore) {
      throw new NotFoundException('Drugstore not found');
    }

    try {
      await drugstore.destroy();
      return drugstore;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete drugstore: ${error.message}`,
      );
    }
  }
}
