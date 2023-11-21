import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Drugstore } from 'src/models/drugstore.model';
import { Venue } from 'src/models/venue.model';
import { Inventory } from 'src/models/inventory.model';
import { Stock_item } from 'src/models/stock-item.model';
import { Provider } from 'src/models/provider.model';
import { Supply_invoice } from 'src/models/supply-invoice.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        models: [
          Drugstore,
          Venue,
          Inventory,
          Stock_item,
          Provider,
          Supply_invoice,
        ],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
