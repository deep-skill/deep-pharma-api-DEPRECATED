import {
  InternalServerErrorException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Provider } from '@/modules/provider/entities/provider.entity';
import { CreateProviderDto, UpdateProviderDto } from './dto/provider.dto';

@Injectable()
export class ProviderService {
  constructor(@InjectModel(Provider) private providerModel: typeof Provider) {}

  async findAll(inclutedDeleted: boolean) {
    try {
      if (inclutedDeleted) {
        return this.providerModel.findAll({
          paranoid: false,
        });
      }

      return this.providerModel.findAll();
    } catch (error) {
      return new InternalServerErrorException(
        `Could not find providers: ${error}`,
      );
    }
  }

  async findById(id: number): Promise<Provider> {
    const providerFound = await this.providerModel.findByPk(id, {
      paranoid: false,
    });

    if (!providerFound)
      throw new NotFoundException("The provider id was't found");

    try {
      return providerFound;
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not find provider: ${error}`,
      );
    }
  }

  async create(provider: CreateProviderDto): Promise<Provider> {
    try {
      const { RUC, legalName } = provider;

      return this.providerModel.create({
        RUC: RUC,
        legal_name: legalName,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Provider could not be created: ${error}`,
      );
    }
  }

  async update(provider: UpdateProviderDto, id: number) {
    const { RUC, legalName } = provider;

    const [updatedRows] = await this.providerModel.update(
      {
        RUC: RUC,
        legal_name: legalName,
      },
      {
        where: { id },
      },
    );

    if (updatedRows === 0) return new NotFoundException('Provider not found');

    try {
      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Provider could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number) {
    const deletedItems = await this.providerModel.destroy({
      where: { id },
    });

    if (deletedItems === 0) return new NotFoundException('Provider not found');

    try {
      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Provider could not be deleted: ${error}`,
      );
    }
  }
}
