import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConcentrationUnitDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateConcentrationUnitDto extends PartialType(
  CreateConcentrationUnitDto,
) {}
