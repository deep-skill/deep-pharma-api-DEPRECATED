import { Module } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Venue } from '@/modules/venue/entities/venue.entity';
import { DrugstoreModule } from '../drugstore/drugstore.module';

@Module({
  imports: [SequelizeModule.forFeature([Venue]), DrugstoreModule],
  controllers: [VenueController],
  providers: [VenueService],
  exports: [VenueService],
})
export class VenueModule {}
