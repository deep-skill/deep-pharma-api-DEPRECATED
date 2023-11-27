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
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum({ true: 1, false: 0 })
  readonly prescriptionRequired?: number;

  @IsNotEmpty()
  @IsInt()
  readonly brandId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  readonly tagIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
