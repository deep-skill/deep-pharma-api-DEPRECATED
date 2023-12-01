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
  readonly inventoryId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly supplyInvoiceId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly saleItemId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @IsOptional()
  @IsString()
  readonly comment?: string;

  @IsOptional()
  @IsDateString()
  readonly expiresAt?: string;
}

export class UpdateStockItemDto extends PartialType(CreateStockItemDto) {}
