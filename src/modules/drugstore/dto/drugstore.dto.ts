import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDrugstoreDto {
  @IsNotEmpty()
  @IsString()
  readonly RUC: string;

  @IsNotEmpty()
  @IsString()
  readonly legalName: string;

  @IsOptional()
  @IsString()
  readonly commercialName?: string;

  @IsOptional()
  @IsString()
  readonly logo?: string;
}

export class UpdateDrugstoreDto extends PartialType(CreateDrugstoreDto) {}
