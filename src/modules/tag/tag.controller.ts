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
import { Tag } from '@/modules/tag/entities/tag.entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted tags',
  })
  @ApiOkResponse({ type: [Tag] })
  getTags(
    @Query('includeDeleted', ParseBoolPipe) includeDeleted: boolean = false,
  ): Promise<Tag[]> {
    return this.tagService.findAll(includeDeleted);
  }

  @Get(':id')
  @ApiOkResponse({ type: Tag })
  getTagById(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return this.tagService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: Tag,
    description: 'Create tag',
  })
  createBrand(@Body() tag: CreateTagDto): Promise<Tag> {
    return this.tagService.create(tag);
  }

  @Put(':id')
  @ApiOkResponse({
    type: Tag,
    description: 'Update tag',
  })
  updateTag(
    @Body() tag: UpdateTagDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Tag> {
    return this.tagService.update(tag, id);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: Tag,
    description: 'Delete soft tag',
  })
  softDeleteBrand(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return this.tagService.softDelete(id);
  }
}
