import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProviderDto {
  @IsNotEmpty()
  @IsString()
  RUC: string;

  @IsNotEmpty()
  @IsString()
  legal_name: string;
}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
