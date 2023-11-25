import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  venueId: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;
}

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {}
