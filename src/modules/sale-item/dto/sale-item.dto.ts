import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSaleItemDto {
  @IsNotEmpty()
  @IsString()
  readonly label: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsNumber()
  readonly concentration: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly concentrationUnitId?: number;

  @IsNumber()
  @IsNotEmpty()
  readonly productId: number;
}

export class UpdateSaleItemDto extends PartialType(CreateSaleItemDto) {}
