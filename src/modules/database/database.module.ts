import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from '@/config/database.config';
import { models } from '@/modules/database/models';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (configService: ConfigType<typeof databaseConfig>) => {
        return { ...configService.database, models };
      },
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
