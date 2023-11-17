import { Module } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Venue } from 'src/models/venue.model';
import { DrugstoreModule } from '../drugstore/drugstore.module';

@Module({
  imports: [SequelizeModule.forFeature([Venue]), DrugstoreModule],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}
