import { Module } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { Provider } from 'src/models/provider.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Provider])],
  controllers: [ProviderController],
  providers: [ProviderService],
})
export class ProviderModule {}
