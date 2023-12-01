import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProviderDto {
  @IsNotEmpty()
  @IsString()
  readonly RUC: string;

  @IsNotEmpty()
  @IsString()
  readonly legalName: string;
}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
