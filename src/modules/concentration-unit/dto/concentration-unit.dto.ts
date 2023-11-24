import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConcentrationUnitDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateConcentrationUnitDto extends PartialType(
  CreateConcentrationUnitDto,
) {}
