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
  invoiceType: InvoiceType;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsDateString()
  deliveredAt: Date;

  @IsNotEmpty()
  @IsNumber()
  providerId: number;
}

export class UpdateSupplyInvoiceDto extends PartialType(
  CreateSupplyInvoiceDto,
) {}
