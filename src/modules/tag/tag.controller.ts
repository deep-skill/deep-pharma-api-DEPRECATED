import {
  Controller,
  ParseIntPipe,
  Param,
  Query,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
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
@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('tag')
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: 'boolean',
    description: 'Include deleted tags',
  })
  @ApiOkResponse({ type: [Tag] })
  getTags(
    @Query('includeDeleted') includeDeleted: boolean = false,
  ): Promise<Tag[]> {
    return this.tagService.findAll(includeDeleted);
  }

  @Get('tag/:id')
  @ApiOkResponse({ type: Tag })
  getTagById(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return this.tagService.findById(id);
  }

  @Get('tag-search/')
  getTagSearch(@Query('query') query : string): Promise<{ rows: Tag[]; count: number; }>  {
    return this.tagService.getTagSearch(query)
  }

  @Post('tag')
  @ApiCreatedResponse({
    type: Tag,
    description: 'Create tag',
  })
  createBrand(@Body() tag: CreateTagDto): Promise<Tag> {
    return this.tagService.create(tag);
  }

  @Put('tag/:id')
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

  @Delete('tag/:id')
  @ApiOkResponse({
    type: Tag,
    description: 'Delete soft tag',
  })
  softDeleteBrand(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return this.tagService.softDelete(id);
  }
}
