import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { InvoiceType } from 'src/models/supply-invoice.model';

export class CreateSupplyInvoiceDto {
  @IsEnum(InvoiceType)
  @IsNotEmpty()
  invoice_type: InvoiceType;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsDateString()
  delivered_at: Date;

  @IsNotEmpty()
  @IsNumber()
  provider_id: number;
}

export class UpdateSupplyInvoiceDto extends PartialType(
  CreateSupplyInvoiceDto,
) {}
