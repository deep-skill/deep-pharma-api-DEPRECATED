import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { isProduction } from '@/utils/constants';

export default registerAs('config', () => {
  return {
    port: process.env.PORT,
    auth0_url: process.env.ISSUER_BASE_URL,
    auth0_audience: process.env.AUDIENCE,
    database: {
      dialect: 'mysql' as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: !isProduction,
      synchronize: !isProduction,
    },
  };
});
