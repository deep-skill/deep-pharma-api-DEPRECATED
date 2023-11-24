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
  inventoryId: number;

  @IsNotEmpty()
  @IsNumber()
  supplyInvoiceId: number;

  @IsNotEmpty()
  @IsNumber()
  saleItemId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

export class UpdateStockItemDto extends PartialType(CreateStockItemDto) {}
