import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly address: string;

  @IsString()
  @IsPhoneNumber()
  readonly phone_number: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  readonly drugstore_id: number;
}

export class UpdateVenueDto extends PartialType(CreateVenueDto) {}
