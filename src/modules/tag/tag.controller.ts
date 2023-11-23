import {
  Controller,
  ParseIntPipe,
  ParseBoolPipe,
  Param,
  Query,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getTags(
    @Query('includeDeleted', ParseBoolPipe) includeDeleted: boolean = false,
  ) {
    return this.tagService.findAll(includeDeleted);
  }

  @Get(':id')
  getTagById(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.findById(id);
  }

  @Post()
  createBrand(@Body() tag: CreateTagDto) {
    return this.tagService.create(tag);
  }

  @Put(':id')
  updateTag(@Body() tag: UpdateTagDto, @Param('id', ParseIntPipe) id: number) {
    return this.tagService.update(tag, id);
  }

  @Delete(':id')
  softDeleteBrand(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.softDelete(id);
  }
}
