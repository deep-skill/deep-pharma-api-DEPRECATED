<<<<<<< HEAD
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
=======
import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1

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
