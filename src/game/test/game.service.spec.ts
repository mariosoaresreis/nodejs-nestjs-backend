import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '../game.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Game, GameDocument } from '../schema/game.schema';
import { createMock } from '@golevelup/ts-jest';
import { GameDTO } from '../dto/game.dto';

const mockGame = (): Game => ({
  _id: '64dbca73a88591c5c5ab6990',
  title: 'GAME TITLE',
  price: 1.0,
  publisher: {
    _id: '64dbca73a88591c5c5ab6990',
    name: 'name',
    siret: 1.0,
    phone: '+5511999999999',
  },
  tags: ['tag1', 'tag2'],
  releaseDate: new Date('2023-08-18'),
  discountApplied: false,
});

const mockGameDoc = (mock?: Partial<Game>): Partial<GameDocument> => ({
  _id: '64dbca73a88591c5c5ab6990',
  title: 'GAME TITLE',
  price: 1.0,
  publisher: {
    _id: '64dbca73a88591c5c5ab6990',
    name: 'name',
    siret: 1.0,
    phone: '+5511999999999',
  },
  tags: ['tag1', 'tag2'],
  releaseDate: new Date('2023-08-18'),
  discountApplied: false,
});

const gameDocArray: Partial<GameDocument>[] = [
  mockGameDoc(),
  mockGameDoc()
];

const gameArray = [mockGame(), mockGame()];

describe('GameService', () => {
  let service: GameService;
  let gameRepository: Model<Game>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getModelToken(Game.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockGame()),
            constructor: jest.fn().mockResolvedValue(mockGame()),
            findByIdAndUpdate: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            findByIdAndDelete: jest.fn()
          },
        },
      ],
    }).compile();

    service = moduleRef.get<GameService>(GameService);
    gameRepository = moduleRef.get<Model<Game>>(getModelToken('Game'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should return all games', async () => {
    jest.spyOn(gameRepository, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(gameDocArray),
    } as unknown as Query<GameDocument[], GameDocument>);
    const games = await service.getGames();
    expect(games.length).toEqual(gameArray.length);
  });

  it('should findById', async () => {
    jest.spyOn(gameRepository, 'findById').mockReturnValueOnce(
      createMock<Query<GameDocument, GameDocument>>({
        exec: jest.fn().mockResolvedValueOnce(
          mockGameDoc({
            _id: '64dbca73a88591c5c5ab6990',
            title: 'GAME TITLE',
            price: 1.0,
            publisher: {
              _id: '64dbca73a88591c5c5ab6990',
              name: 'name',
              siret: 1.0,
              phone: '+5511999999999',
            },
            tags: ['tag1', 'tag2'],
            releaseDate: new Date('2023-08-18'),
            discountApplied: false,
          }),
        ),
      }),
    );
    const findMockGame = mockGame();
    const foundGame = await service.getGame('64dbca73a88591c5c5ab6990');
    expect(foundGame).toEqual(findMockGame);
  });

  it('should update a game successfully', async () => {
    jest.spyOn(gameRepository, 'findByIdAndUpdate').mockReturnValueOnce(
      createMock<Query<GameDocument, GameDocument>>({
        exec: jest.fn().mockResolvedValueOnce({
          _id: '64dbca73a88591c5c5ab6990',
          title: 'GAME TITLE',
          price: 1.0,
          publisher: {
            _id: '64dbca73a88591c5c5ab6990',
            name: 'name',
            siret: 1.0,
            phone: '+5511999999999',
          },
          tags: ['tag1', 'tag2'],
          releaseDate: new Date('2023-08-18'),
          discountApplied: false,
        }),
      }),
    );

    const gameDTO: GameDTO = {
      _id: '1',
      title: 'GAME TITLE',
      price: 1.0,
      publisher: {
        _id: '64dbca73a88591c5c5ab6990',
        name: 'name',
        siret: 1.0,
        phone: '+5511999999999',
      },
      tags: ['tag1', 'tag2'],
      releaseDate: new Date('2023-08-18'),
      discountApplied: false,
    };

    const updatedGame = await service.updateGame('id', gameDTO);

    expect(updatedGame).toEqual({
      _id: '64dbca73a88591c5c5ab6990',
      title: 'GAME TITLE',
      price: 1.0,
      publisher: {
        _id: '64dbca73a88591c5c5ab6990',
        name: 'name',
        siret: 1.0,
        phone: '+5511999999999',
      },
      tags: ['tag1', 'tag2'],
      releaseDate: new Date('2023-08-18'),
      discountApplied: false,
    });
  });

  it('should delete a game successfully', async () => {
    jest.spyOn(gameRepository, 'findByIdAndDelete').mockReturnValueOnce(
      createMock<Query<GameDocument, GameDocument>>({
        exec: jest.fn().mockResolvedValueOnce({
          _id: '64dbca73a88591c5c5ab6990',
          title: 'GAME TITLE',
          price: 1.0,
          publisher: {
            _id: '64dbca73a88591c5c5ab6990',
            name: 'name',
            siret: 1.0,
            phone: '+5511999999999',
          },
          tags: ['tag1', 'tag2'],
          releaseDate: new Date('2023-08-18'),
          discountApplied: false,
        }),
      }),
    );

    jest.spyOn(gameRepository, 'findById').mockReturnValueOnce(
      createMock<Query<GameDocument, GameDocument>>({
        exec: jest.fn().mockResolvedValueOnce({
          _id: '64dbca73a88591c5c5ab6990',
          title: 'GAME TITLE',
          price: 1.0,
          publisher: {
            _id: '64dbca73a88591c5c5ab6990',
            name: 'name',
            siret: 1.0,
            phone: '+5511999999999',
          },
          tags: ['tag1', 'tag2'],
          releaseDate: new Date('2023-08-18'),
          discountApplied: false,
        }),
      }),
    );

    const deletedGame = await service.deleteGame('a bad id')
    expect(deletedGame).toEqual(mockGame());
  });


});
