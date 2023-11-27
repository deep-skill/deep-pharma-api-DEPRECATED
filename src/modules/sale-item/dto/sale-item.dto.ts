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

  @IsNumber()
  @IsNotEmpty()
  readonly concentrationUnitId: number;
}

export class UpdateSaleItemDto extends PartialType(CreateSaleItemDto) {}
