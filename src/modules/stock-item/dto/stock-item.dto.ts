import { PartialType } from '@nestjs/swagger';
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

  @IsNotEmpty()
  @IsNumber()
  supply_invoice_id: number;

  @IsNotEmpty()
  @IsNumber()
  sale_item_id: number;

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
