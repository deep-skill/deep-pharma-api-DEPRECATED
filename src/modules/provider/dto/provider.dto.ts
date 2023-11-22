import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';

export class CreateProviderDto {
  @IsNotEmpty()
  @IsString()
  RUC: string;

  @IsNotEmpty()
  @IsString()
  legal_name: string;
}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
