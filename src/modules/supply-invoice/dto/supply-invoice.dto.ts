import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
} from 'class-validator';
import { InvoiceType } from '@/modules/supply-invoice/entities/supply-invoice.entity';

export class CreateSupplyInvoiceDto {
  @IsNotEmpty()
  @IsEnum(InvoiceType)
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
