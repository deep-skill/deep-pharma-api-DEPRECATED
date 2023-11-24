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

  async findById(id: number) {
    try {
      const providerFound = await this.providerModel.findOne({
        where: { id },
        paranoid: false,
      });

      if (!providerFound) return new NotFoundException('Provider not found');

      return providerFound;
    } catch (error) {
      return new InternalServerErrorException(
        `Could not find provider: ${error}`,
      );
    }
  }

  async create(provider: CreateProviderDto): Promise<Provider> {
    try {
      return this.providerModel.create({
        RUC: provider.RUC,
        legal_name: provider.legal_name,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Provider could not be created: ${error}`,
      );
    }
  }

  async update(provider: UpdateProviderDto, id: number) {
    try {
      const [updatedRows] = await this.providerModel.update(provider, {
        where: { id },
      });

      if (updatedRows === 0) return new NotFoundException('Provider not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Provider could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number) {
    try {
      const deletedItems = await this.providerModel.destroy({
        where: { id },
      });

      if (deletedItems === 0)
        return new NotFoundException('Provider not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Provider could not be deleted: ${error}`,
      );
    }
  }
}
