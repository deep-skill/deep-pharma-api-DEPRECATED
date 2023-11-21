import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConcentrationUnitDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateConcentrationUnitDto extends PartialType(
  CreateConcentrationUnitDto,
) {}
