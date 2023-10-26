import { Module } from '@nestjs/common';
import { PharmacistController } from './pharmacist.controller';

@Module({
  controllers: [PharmacistController]
})
export class PharmacistModule {}
