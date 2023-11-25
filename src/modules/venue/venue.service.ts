import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Venue } from 'src/models/venue.entity';
import { CreateVenueDto, UpdateVenueDto } from './dto/venue.dto';
import { DrugstoreService } from '../drugstore/drugstore.service';

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue) private venueModel: typeof Venue,
    private readonly drugstoreService: DrugstoreService,
  ) {}

  async findAll(includeDeleted: boolean): Promise<Venue[]> {
    try {
      if (includeDeleted) {
        return this.venueModel.findAll();
      }

      return this.venueModel.findAll({
        where: {
          deleted_at: null,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to obtain venues: ${error.message}`,
      );
    }
  }

  async findById(id: number): Promise<Venue> {
    const venue = await this.venueModel.findByPk(id, { paranoid: false });

    if (!venue) {
      throw new NotFoundException('Venue not found');
    }

    try {
      return venue;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to obtain venue: ${error.message}`,
      );
    }
  }

  async findByForeignKey(id: number): Promise<Venue[]> {
    const venues = await this.venueModel.findAll({
      where: {
        drugstore_id: id,
      },
    });

    if (!venues) {
      throw new NotFoundException('Venues not found');
    }

    try {
      return venues;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to obtain venues: ${error.message}`,
      );
    }
  }

  async create(venueData: CreateVenueDto): Promise<Venue> {
    const {
      name,
      address,
      phoneNumber,
      email,
      // drugstoreId
    } = venueData;

    // await this.drugstoreService.findById(drugstoreId);

    try {
      const newVenue = await this.venueModel.create({
        name,
        address,
        phone_number: phoneNumber,
        email,
        // drugstore_id: drugstoreId,
      });

      return newVenue;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create venue: ${error.message}`,
      );
    }
  }

  async update(id: number, venueData: UpdateVenueDto): Promise<Venue> {
    const {
      name,
      address,
      phoneNumber,
      email,
      // drugstoreId
    } = venueData;

    const venue = await this.findById(id);

    try {
      await venue.update({
        name,
        address,
        phone_number: phoneNumber,
        email,
        // drugstore_id: drugstoreId,
      });
      return venue;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update venue: ${error.message}`,
      );
    }
  }

  async softDelete(id: number): Promise<Venue> {
    const deletedVenue = await this.venueModel.destroy({
      where: { id },
    });

    if (deletedVenue === 0) {
      throw new NotFoundException('Venue not found');
    }

    try {
      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete venue: ${error.message}`,
      );
    }
  }
}
