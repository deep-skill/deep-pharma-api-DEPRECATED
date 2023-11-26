import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { InvoiceType } from '@/modules/supply-invoice/entities/supply-invoice.entity';

export class CreateSupplyInvoiceDto {
  @IsNotEmpty()
  @IsEnum(InvoiceType)
  invoice_type: InvoiceType;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsDateString()
  delivered_at: Date;

  @IsNotEmpty()
  @IsNumber()
  provider_id: number;
}

export class UpdateSupplyInvoiceDto extends PartialType(
  CreateSupplyInvoiceDto,
) {}
