import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProvider } from './database/datasource.provider';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseProvider(),
      autoLoadEntities: true,
    } as TypeOrmModuleOptions),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
