import { join } from 'path';

export const databaseProvider = () => {
  return {
    type: 'mssql',
    host: process.env.APP_DATABASE_HOST,
    port: Number(process.env.APP_DATABASE_PORT),
    username: process.env.APP_DATABASE_USERNAME,
    password: process.env.APP_DATABASE_PASSWORD,
    database: process.env.APP_DATABASE_NAME,
    entities: [join(__dirname, '..', '**', '**', '*.entity{.ts,.js}')],
    synchronize: false,
    extra: {
      trustServerCertificate: true,
    },
  };
};
