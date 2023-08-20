import { Test } from '@nestjs/testing';
import { Connection, Types } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/database/database.service';

describe('UsersController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('games').deleteMany({});
  });

  describe('SUCESSO - games/insert', () => {
    it('should return an array of games', async () => {
      let game = {
        _id: null,
        title: 'JOGO PARA PERMANECER 3',
        price: 100.0,
        publisher: {
          _id: new Types.ObjectId('64dbca73a88591c5c5ab6990'),
        },
        tags: ['car', 'fps', 'rpg'],
        releaseDate: '2022-07-12T16:48:43-05:00',
      };

      const response = await request(httpServer)
        .post('/game/create', () => {})
        .send(game);

      expect(response.status).toBe(201);
      expect({
        title: response.body.data.title,
        price: response.body.data.price,
        tags: response.body.data.tags,
      }).toMatchObject({
        title: game.title,
        price: game.price,
        tags: game.tags,
      });
    });
  });

  describe('games/getAll', () => {
    let id = '64de5cfff8c453aa7061bc19';
    it('should return an array of games', async () => {
      let game = {
        _id: new Types.ObjectId(id),
        title: 'JOGO PARA PERMANECER 3',
        price: 100.0,
        publisher: {
          _id: new Types.ObjectId('64dbca73a88591c5c5ab6990'),
        },
        tags: ['car', 'fps', 'rpg'],
        releaseDate: '2022-07-12T16:48:43-05:00',
      };

      await dbConnection.collection('games').insertOne(game);
      const response = await request(httpServer).get('/game/getAll');

      expect(response.status).toBe(200);
      expect({
        title: response.body.data[0].title,
        price: response.body.data[0].price,
        tags: response.body.data[0].tags,
      }).toMatchObject({
        title: game.title,
        price: game.price,
        tags: game.tags,
      });
    });
  });

  describe('GET games/{id}}', () => {
    let id = '64de5cfff8c453aa7061bc19';

    let game = {
      _id: new Types.ObjectId(id),
      title: 'JOGO PARA PERMANECER 3',
      price: 100.0,
      publisher: {
        _id: '64dbca73a88591c5c5ab6990',
      },
      tags: ['car', 'fps', 'rpg'],
      releaseDate: '2022-07-12T16:48:43-05:00',
    };

    it('should return a game by id', async () => {
      await dbConnection.collection('games').insertOne(game);
      const response = await request(httpServer).get(`/game/${id}`);

      expect(response.status).toBe(200);
      let data = response.body.data;
      expect({
        title: data.title,
        price: data.price,
        tags: data.tags,
      }).toMatchObject({
        title: game.title,
        price: game.price,
        tags: game.tags,
      });
    });
  });

  describe('SUCESS - DELETE games/{id}}', () => {
    let id = '64de5cfff8c453aa7061bc19';
    let game = {
      _id: new Types.ObjectId(id),
      title: 'JOGO PARA PERMANECER 3',
      price: 100.0,
      publisher: {
        _id: '64dbca73a88591c5c5ab6990',
      },
      tags: ['car', 'fps', 'rpg'],
      releaseDate: '2022-07-12T16:48:43-05:00',
    };

    it('should return a game by id', async () => {
      await dbConnection.collection('games').insertOne(game);
      const response = await request(httpServer).delete(`/game/${id}`);

      expect(response.status).toBe(200);
      let data = response.body.data;
      expect({
        title: data.title,
        price: data.price,
        tags: data.tags,
      }).toMatchObject({
        title: game.title,
        price: game.price,
        tags: game.tags,
      });
    });
  });

  describe('ERROR - ID DOES NOT EXIST - DELETE games/{id}}', () => {
    let id = '64de5cfff8c453aa7061bc19';
    let game = {
      _id: new Types.ObjectId(id),
      title: 'JOGO PARA PERMANECER 3',
      price: 100.0,
      publisher: {
        _id: '64dbca73a88591c5c5ab6990',
      },
      tags: ['car', 'fps', 'rpg'],
      releaseDate: '2022-07-12T16:48:43-05:00',
    };

    it('should not return a game by id - 404', async () => {
      await dbConnection.collection('games').insertOne(game);
      const response = await request(httpServer).delete(`/game/${id + '1'}`);
      expect(response.status).toBe(404);
    });
  });
});
