import {
  BadRequestException,
  ConflictException,
  Injectable,
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
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new BadRequestException(
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
      throw new BadRequestException(
        `Failed to obtain drugstore: ${error.message}`,
      );
    }
  }

  async create(drugstoreData: CreateDrugstoreDto) {
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
      throw new BadRequestException(
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
      throw new BadRequestException(
        `Failed to update drugstore: ${error.message}`,
      );
    }
  }

  async softDelete(id: number): Promise<Drugstore> {
    const drugstore = await this.findById(id);
    if (!drugstore) {
      throw new NotFoundException('Drugstore not found');
    }

    if (drugstore.deletedAt) {
      throw new ConflictException('Drugstore has already been deleted');
    }

    try {
      drugstore.deletedAt = new Date();
      await drugstore.save();
      return drugstore;
    } catch (error) {
      throw new BadRequestException(
        `Failed to delete drugstore: ${error.message}`,
      );
    }
  }

  async hardDelete(id: number) {
    const drugstore = await this.drugstoreModel.findByPk(id);

    if (!drugstore) {
      throw new NotFoundException(
        'Drugstore not found or has already been deleted',
      );
    }

    try {
      await this.drugstoreModel.destroy({
        where: { id },
      });

      return {
        message: 'Drugstore has been physically deleted',
        statusCode: 200,
      };
    } catch (error) {
      throw new BadRequestException(
        `Failed to delete drugstore: ${error.message}`,
      );
    }
  }
}
