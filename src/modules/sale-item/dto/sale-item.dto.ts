import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSaleItemDto {
  @IsString()
  @IsNotEmpty()
  readonly label: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly concentration: number;

  @IsNumber()
  @IsNotEmpty()
  readonly concentrationUnitId: number;
}

export class UpdateSaleItemDto extends PartialType(CreateSaleItemDto) {}
