import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppLoggerMiddleware } from './app-request-logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProvider } from './database/datasource.provider';
import { UserAddressModule } from './user-address/user-address.module';
import { UserModule } from './user/user.module';
import { TrashShareModule } from './trash-share/trash-share.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseProvider(),
      autoLoadEntities: true,
    } as TypeOrmModuleOptions),
    ConfigModule.forRoot(),
    UserModule,
    UserAddressModule,
    TrashShareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
