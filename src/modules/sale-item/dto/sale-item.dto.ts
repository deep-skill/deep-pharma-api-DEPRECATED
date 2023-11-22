import { PartialType } from '@nestjs/mapped-types';
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
  readonly concentration_unit_id: number;
}

export class UpdateSaleItemDto extends PartialType(CreateSaleItemDto) {}