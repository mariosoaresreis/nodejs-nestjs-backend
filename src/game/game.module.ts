import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken} from '@nestjs/mongoose';
import { GameController } from './game.controller';
import { GameService } from './game.service';
//import { GameSchema } from './schema/game.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { GameSchema } from './schema/game.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Game', schema: GameSchema }
    ]),
    ScheduleModule.forRoot()
  ],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
