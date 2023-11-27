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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { VenueService } from './venue.service';
import { Venue } from '@/modules/venue/entities/venue.entity';
import { CreateVenueDto, UpdateVenueDto } from './dto/venue.dto';

@ApiTags('venue')
@Controller()
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Get('venue')
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted items',
  })
  @ApiOkResponse({ type: [Venue] })
  async GetAllVenues(
    @Query('includeDeleted') includeDeleted = false,
  ): Promise<Venue[]> {
    return this.venueService.findAll(includeDeleted);
  }

  @Get('venue/:id')
  @ApiOkResponse({ type: Venue })
  async getVenueById(@Param('id', ParseIntPipe) id: number) {
    return this.venueService.findById(id);
  }

  @Get('drugstore/:id/venue')
  @ApiOkResponse({
    type: [Venue],
    description: 'Venues obtained by drugstore foreign key',
  })
  async getVenuesByForeignKey(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Venue[]> {
    return this.venueService.findByForeignKey(id);
  }

  @Post('venue')
  @ApiCreatedResponse({
    type: Venue,
    description: 'Create venue',
  })
  async createVenue(@Body() venueData: CreateVenueDto): Promise<Venue> {
    return this.venueService.create(venueData);
  }

  @Put('venue/:id')
  @ApiOkResponse({
    type: Venue,
    description: 'Update venue',
  })
  async updateVenue(
    @Param('id', ParseIntPipe) id: number,
    @Body() venueData: UpdateVenueDto,
  ): Promise<Venue> {
    return this.venueService.update(id, venueData);
  }

  @Delete('venue/:id')
  @ApiOkResponse({
    type: Venue,
    description: 'Delete soft venue',
  })
  async softDeleteVenue(@Param('id', ParseIntPipe) id: number): Promise<Venue> {
    return this.venueService.softDelete(id);
  }
}
