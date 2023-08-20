import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { PublisherModule } from './publisher/publisher.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppLoggerMiddleware } from './middleware/ApiLoggerMiddleware';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(
      'mongodb+srv://marioreis:5gl6cyhiSpxM8Nf3@devconnector.wgdcfm4.mongodb.net/test?retryWrites=true&w=majority',
      {},
    ),

    GameModule,
    PublisherModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
