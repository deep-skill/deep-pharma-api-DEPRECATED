<<<<<<< HEAD
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';
=======
import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
>>>>>>> c11114c534e5c022d3311f72964051daa0dfb7f1

export class CreateProviderDto {
  @IsNotEmpty()
  @IsString()
  RUC: string;

  @IsNotEmpty()
  @IsString()
  legalName: string;
}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
