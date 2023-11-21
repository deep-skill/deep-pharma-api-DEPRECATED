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
import { VenueService } from './venue.service';
import { Venue } from 'src/models/venue.model';
import { CreateVenueDto, UpdateVenueDto } from './dto/venue.dto';

@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Get()
  async GetAllVenues(
    @Query('includeDeleted') includeDeleted = false,
  ): Promise<Venue[]> {
    return this.venueService.findAll(includeDeleted);
  }

  @Get(':id')
  async getVenueById(@Param('id', ParseIntPipe) id: number) {
    return this.venueService.findById(id);
  }

  @Get('drugstore/:id')
  async getVenuesByForeignKey(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Venue[]> {
    return this.venueService.findByForeignKey(id);
  }

  @Post()
  async createVenue(@Body() venueData: CreateVenueDto): Promise<Venue> {
    return this.venueService.create(venueData);
  }

  @Put(':id')
  async updateVenue(
    @Param('id', ParseIntPipe) id: number,
    @Body() venueData: UpdateVenueDto,
  ): Promise<Venue> {
    return this.venueService.update(id, venueData);
  }

  @Delete(':id')
  async softDeleteVenue(@Param('id', ParseIntPipe) id: number): Promise<Venue> {
    return this.venueService.softDelete(id);
  }
}
