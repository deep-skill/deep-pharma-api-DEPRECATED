import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from 'src/models/tag.model';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag) private tagModel: typeof Tag,
  ) {}

  async findAll(includeDeleted: boolean) {
    try {
      if (includeDeleted) {
        return this.tagModel.findAll({
          paranoid: false,
        })
      }

      return this.tagModel.findAll();
    } catch (error) {
      return new InternalServerErrorException(
        `Could not find tags: ${error}`,
      );
    }
  }

  async findById(id: number) {
    try {
      const tagFound = await this.tagModel.findOne({
        where: { id },
      })

      if (!tagFound) return new NotFoundException('Tag not found');

      return tagFound;
    } catch (error) {
      return new InternalServerErrorException(
        `Could not find tag: ${error}`,
      );
    }
  }

  async create(tag: CreateTagDto) {
    try {
      return this.tagModel.create({
        name: tag.name,
        category: tag.category ?? null,
      })
    } catch (error) {
      return new InternalServerErrorException(
        `Tag could not be created: ${error}`,
      );
    }
  }

  async update(tag: UpdateTagDto, id: number) {
    try {
      const [updatedRows] = await this.tagModel.update(tag, {
        where: { id },
      })

      if (updatedRows === 0) 
        return new NotFoundException('Tag not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Tag could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number) {
    try {
      const deletedRows = await this.tagModel.destroy({
        where: { id },
      })

      if (deletedRows === 0) return new NotFoundException('Tag not found');

      return this.findById(id);
    } catch (error) {
      return new InternalServerErrorException(
        `Tag could not be deleted: ${error}`,
      );
    }
  }
}


