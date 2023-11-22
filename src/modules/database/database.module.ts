import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from 'src/config/database.config';
import { models } from 'src/models/index.models';

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
          models,
          autoLoadModels: true,
          synchronize: true,
        };
      },
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
