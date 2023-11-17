import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {}
