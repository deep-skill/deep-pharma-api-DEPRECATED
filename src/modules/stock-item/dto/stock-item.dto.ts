import { PartialType } from '@nestjs/mapped-types';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateStockItemDto {
  @IsNotEmpty()
  @IsNumber()
  inventory_id: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsDateString()
  expires_at?: string;
}

export class UpdateStockItemDto extends PartialType(CreateStockItemDto) {}
