import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from 'src/config/database.config';
import { Drugstore } from 'src/models/drugstore.model';
import { Venue } from 'src/models/venue.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (configService: ConfigType<typeof databaseConfig>) => {
        const { host, port, username, password, database } = configService;

        return {
          dialect: 'mysql',
          host,
          port,
          username,
          password,
          database,
          models: [Drugstore, Venue],
          autoLoadModels: true,
          synchronize: true,
        };
      },
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
