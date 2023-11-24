import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import config from '@/config/config';
import { models } from '@/modules/database/models';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return { ...configService.database, models };
      },
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
