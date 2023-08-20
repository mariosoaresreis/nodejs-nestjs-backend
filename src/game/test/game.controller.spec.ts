import { Test } from "@nestjs/testing"
import { gameStub } from "./stubs/game.stub";
import { GameController } from "../game.controller";
import { GameService } from "../game.service";
import { GameDTO } from "../dto/game.dto";
import { PublisherDTO } from "../../publisher/dto/publisher.dto";
import { createGameStub } from "./stubs/create-game.stub";
jest.mock('../game.service');

describe('GameController', () => {
  let gameController: GameController;
  let gameService: GameService;
  var httpMocks = require('node-mocks-http');

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [GameController],
      providers: [GameService]
    }).compile();

    gameController = moduleRef.get<GameController>(GameController);
    gameService = moduleRef.get<GameService>(GameService);
    jest.clearAllMocks();
  })

  describe('getGame', () => {
    describe('when getGame is called', () => {
      let game: JSON;

      beforeEach(async () => {
        game = await gameController.getGameById(httpMocks.createResponse(), gameStub()._id);
      })

      test('then it should call gameService', () => {
        expect(gameService.getGame).toBeCalledWith(gameStub()._id);
      })
    })
  })

  describe('getGames', () => {
    describe('when getGames is called', () => {
      let games: JSON;

      beforeEach(async () => {
        games = await gameController.getAllGames(httpMocks.createResponse());
      })

      test('then it should call usersService', () => {
        expect(gameService.getGames).toHaveBeenCalled();
      })
    })
  })

  describe('createGame', () => {
    describe('when createGame is called', () => {
      let game: JSON;
      let createGameDto: GameDTO
      let publisher: PublisherDTO;
      let releaseDate = new Date("2023-08-18");

      beforeEach(async () => {
        createGameDto = {
            _id: null,
            title: "GAME TITLE",            
            price: 1.0,            
            publisher: {
              _id: "string",       
              name: "name", 
              siret: 1,
              phone: "+5511999999999"
            },
            tags: ["tag1", "tag2"],
            releaseDate: releaseDate,
            discountApplied: false
        }
        game = await gameController.createGame(httpMocks.createResponse(), createGameDto);
      })

      test('then it should call gameService', () => {
        expect(gameService.createGame).toHaveBeenCalledWith(createGameStub());
      })
    })
  })

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let game: JSON;
      let updateGameDto: GameDTO;

      beforeEach(async () => {
        updateGameDto = {
          _id: '64dbca73a88591c5c5ab6990',
          title: 'GAME TITLE',
          price: 1.0,
          publisher: {
            _id: "string",       
            name: "name", 
            siret: 1,
            phone: "+5511999999999"
          },
          tags: ['tag1', 'tag2'],
          releaseDate: new Date('2023-08-18'),
          discountApplied: false,
        }
        game = await gameController.updateGame(httpMocks.createResponse(), updateGameDto, gameStub()._id);
      })

      test('then it should call usersService', () => {
        expect(gameService.updateGame).toHaveBeenCalledWith(gameStub()._id, updateGameDto);
      })
    })
  })
})
