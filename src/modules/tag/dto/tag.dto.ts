import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  category: string;
}

export class UpdateTagDto extends PartialType(CreateTagDto) {}
