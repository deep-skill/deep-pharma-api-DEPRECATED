import { PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateVenueDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  readonly phoneNumber?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email?: string;

  @IsNotEmpty()
  @IsNumber()
  readonly drugstoreId: number;
}

export class UpdateVenueDto extends PartialType(CreateVenueDto) {}
