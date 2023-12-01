import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from '@/modules/tag/entities/tag.entity';
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
    const tagFound = await this.tagModel.findByPk(id, {
      paranoid: false,
    });

    if (!tagFound) throw new NotFoundException('Tag not found');

    try {
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
        category: category,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Tag could not be created: ${error}`,
      );
    }
  }

  async update(tag: UpdateTagDto, id: number): Promise<Tag> {
    const { name, category } = tag;

    const [updatedRows] = await this.tagModel.update(
      {
        name: name,
        category: category,
      },
      {
        where: { id },
      },
    );

    if (updatedRows === 0) throw new NotFoundException('Tag not found');

    try {
      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Tag could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number): Promise<Tag> {
    const deletedRows = await this.tagModel.destroy({
      where: { id },
    });

    if (deletedRows === 0) throw new NotFoundException('Tag not found');

    try {
      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Tag could not be deleted: ${error}`,
      );
    }
  }

  async validateTagIds(tagIds: number[]) {
    for (const tagId of tagIds) {
      const tag = await this.tagModel.findByPk(tagId);
      if (!tag) {
        throw new BadRequestException(
          'One or more of the tag ids you have provided does not exit',
        );
      }
    }
  }
}
