import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDrugstoreDto {
  @IsString()
  @IsNotEmpty()
  readonly RUC: string;

  @IsString()
  @IsNotEmpty()
  readonly legal_name: string;

  @IsString()
  readonly commercial_name: string;

  @IsString()
  readonly logo: string;
}

export class UpdateDrugstoreDto extends PartialType(CreateDrugstoreDto) {}
