import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
} from 'class-validator';
import { InvoiceType } from 'src/models/supply-invoice.model';

export class CreateSupplyInvoiceDto {
  @IsEnum(InvoiceType)
  @IsNotEmpty()
  invoiceType: InvoiceType;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  deliveredAt: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  providerId: number;
}

export class UpdateSupplyInvoiceDto extends PartialType(
  CreateSupplyInvoiceDto,
) {}
