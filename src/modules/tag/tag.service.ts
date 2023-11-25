import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from 'src/models/tag.entity';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag) private tagModel: typeof Tag) {}

  async findAll(includeDeleted: boolean): Promise<Tag[]> {
    try {
      if (includeDeleted) {
        return this.tagModel.findAll({
          paranoid: false,
        });
      }

      return this.tagModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException(`Could not find tags: ${error}`);
    }
  }

  async findById(id: number): Promise<Tag> {
    try {
      const tagFound = await this.tagModel.findByPk(id, {
        paranoid: false,
      });

      if (!tagFound) throw new NotFoundException('Tag not found');

      return tagFound;
    } catch (error) {
      throw new InternalServerErrorException(`Could not find tag: ${error}`);
    }
  }

  async create(tag: CreateTagDto): Promise<Tag> {
    try {
      const { name, category } = tag;

      return this.tagModel.create({
        name: name,
        category: category ?? null,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Tag could not be created: ${error}`,
      );
    }
  }

  async update(tag: UpdateTagDto, id: number): Promise<Tag> {
    try {
      const [updatedRows] = await this.tagModel.update(tag, {
        where: { id },
      });

      if (updatedRows === 0) throw new NotFoundException('Tag not found');

      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Tag could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number): Promise<Tag> {
    try {
      const deletedRows = await this.tagModel.destroy({
        where: { id },
      });

      if (deletedRows === 0) throw new NotFoundException('Tag not found');

      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Tag could not be deleted: ${error}`,
      );
    }
  }

  async validateTagIds(tagIds: number[]) {
    try {
      for (const tagId of tagIds) {
        const tag = await this.tagModel.findByPk(tagId);
        if (!tag) {
          throw new BadRequestException(
            'One or more of the tag ids you have provided does not exit',
          );
        }
      }

      return true;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
