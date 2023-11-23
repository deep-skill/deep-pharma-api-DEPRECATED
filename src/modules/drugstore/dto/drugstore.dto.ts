import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDrugstoreDto {
  @IsString()
  @IsNotEmpty()
  readonly RUC: string;

  @IsString()
  @IsNotEmpty()
  readonly legalName: string;

  @IsString()
  readonly commercialName: string;

  @IsString()
  readonly logo: string;
}

export class UpdateDrugstoreDto extends PartialType(CreateDrugstoreDto) {}
