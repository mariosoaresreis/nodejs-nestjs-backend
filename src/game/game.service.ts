import { ConsoleLogger, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Game } from './schema/game.schema';
import { GameDTO } from './dto/game.dto';
import { Model, Types } from 'mongoose';

@Injectable()
export class GameService {
    private readonly logger = new Logger(GameService.name);

    constructor(@InjectModel('Game') private gameRepository: Model<Game>) { }

    async createGame(gameDTO: GameDTO): Promise<Game> {  
        const game = new this.gameRepository(gameDTO);
        return await game.save();
    }

    async deleteGame(gameID: string): Promise<Game> {          
       let game =  await this.gameRepository.findById(gameID).exec();
       
       if (!game){
          throw new NotFoundException();   
       }
       
       let deletedGame = await this.gameRepository.findByIdAndDelete(gameID).exec();            
       return deletedGame;        
    }

    async getGame(gameID: string): Promise<Game> {
        const game = await this.gameRepository.findById(gameID).exec();

        if (!game){
            throw new NotFoundException();
        }

        return game;
    }

    async getGames(): Promise<Game[]>  {
        const games = await this.gameRepository.find().exec()

        if (!games)
            throw new NotFoundException();

        return games;                              
    }

    async updateGame(gameID: string, gameDTO: GameDTO): Promise<Game> {
        const updatedGame = await this.gameRepository.findByIdAndUpdate(gameID,
                                                                   gameDTO).exec();
        return updatedGame;
    }    
}
