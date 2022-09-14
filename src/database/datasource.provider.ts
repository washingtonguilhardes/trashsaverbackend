import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseProvider = (): TypeOrmModuleOptions => {
  return {
    type: 'mssql',
    host: process.env.INSTANCE_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '..', '**', '**', '*.entity{.ts,.js}')],
    synchronize: false,
    extra: {
      trustServerCertificate: true,
    },
  };
};
