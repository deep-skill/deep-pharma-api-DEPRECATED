import { PartialType } from '@nestjs/swagger';
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
  readonly phoneNumber: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  // @IsNumber()
  // @IsNotEmpty()
  // readonly drugstoreId: number;
}

export class UpdateVenueDto extends PartialType(CreateVenueDto) {}
