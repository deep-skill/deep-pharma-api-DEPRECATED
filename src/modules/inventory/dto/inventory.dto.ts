import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryDto {
  // @IsNotEmpty()
  // @IsNumber()
  // venueId: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;
}

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {}
