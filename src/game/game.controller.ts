import { Controller, Delete, Get, Post, Put, Res, HttpStatus, Body, Param, Logger } from '@nestjs/common';
import { GameDTO } from './dto/game.dto';
import { GameService } from './game.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';


@Controller('game')
@ApiTags('Games')
export class GameController {
    private readonly logger = new Logger(GameService.name);

    constructor(private gameService: GameService) {}

    @Post('/create')    
    @ApiBody({ type: GameDTO })
    async createGame(@Res() res, @Body() gamerDTO: GameDTO): Promise<JSON> {       
        const createdGame = await this.gameService.createGame(gamerDTO);
        this.logger.log(createdGame);

        return res.status(HttpStatus.CREATED).json({
            data: createdGame,
            message: 'Game was successfully created.',
            status: HttpStatus.CREATED
        });
    }

    @Delete('/:id')
    @ApiParam({name: 'id', required: true, description: 'Game ID'})
    async deleteGame(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const deletedGame = await this.gameService.deleteGame(id);

            jsonResponse = {
                data: deletedGame,
                message: `Game with id ${id} was deleted.`,
                status: HttpStatus.OK
            }
        } catch(error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Game with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }


        return res.status(jsonResponse.status).json(jsonResponse);
    }

    @Get('/getAll')
    async getAllGames(@Res() res): Promise<JSON> {
        const games = await this.gameService.getGames();

        return res.status(HttpStatus.OK).json({
            data: games,
            message: 'Returning all games.',
            status: HttpStatus.OK
        });
    }

    @Get('/:id')
    @ApiParam({name: 'id', required: true, description: 'Game ID'})
    async getGameById(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const game = await this.gameService.getGame(id);
            jsonResponse = {
                data: game,
                message: `Returning game ${id}.`,
                status: HttpStatus.OK
            }
        } catch(error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Game with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }

    @Put(':id')
    @ApiBody({ type: GameDTO })
    @ApiParam({name: 'id', required: true, description: 'Game ID'})
    async updateGame(@Res() res, @Body() gameDTO: GameDTO, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const game = await this.gameService.updateGame(id, gameDTO);
            jsonResponse = {
                data: game,
                message: `Returning updated game ${id}.`,
                status: HttpStatus.OK
            }
        } catch(error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Game with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }
   
}
