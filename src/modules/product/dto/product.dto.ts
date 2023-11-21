import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  prescription_required?: number;

  @IsNotEmpty()
  @IsNumber()
  brand_id: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
