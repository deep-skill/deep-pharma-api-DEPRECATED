import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  venueId: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {}
