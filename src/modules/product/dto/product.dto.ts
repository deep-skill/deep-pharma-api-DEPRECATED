import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsInt,
  IsEnum,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum({ true: 1, false: 0 })
  prescriptionRequired?: number;

  @IsNotEmpty()
  @IsInt()
  brandId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  tagIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
