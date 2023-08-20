import { Test } from '@nestjs/testing';
import { Connection, Types } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/database/database.service';

describe('PublishersController', () => {
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
    await dbConnection.collection('publishers').deleteMany({});
  });

  /***
   * publisher - CRUD
   */

  /***
   * publisher - CREATE
   */
 

  describe('SUCESSO - publishers/insert', () => {
    it('should save publisher', async () => {
      let publisher = {        
        "_id": null,
        name: 'EA Games',
        siret: 2,
        phone: '+5511999999999',
      };

      const response = await request(httpServer)
        .post('/publisher/create', () => {})
        .send(publisher);

      expect(response.status).toBe(201);
      expect({
        title: response.body.data.name,
        price: response.body.data.siret,
        tags: response.body.data.phone,
      }).toMatchObject({
        title: publisher.name,
        price: publisher.siret,
        tags: publisher.phone,
      });
    });
  });
  

  describe('ERROR 500 - publishers/insert', () => {
    it('should return an array of publishers', async () => {
      let publisher = {
        name: '',
        siret: 2,
        phone: '+5511999999999',
      };

      const response = await request(httpServer)
        .post('/publisher/create', () => {})
        .send(publisher);
      expect(response.status).toBe(500);
    });
  });

  /***
   * publisher - RETRIEVE - 200 - 400 - 500
   */
  describe('SUCESS GET publisher/{id}}', () => {
    let id = '64de989732d0f092dc54ed0a';

    let publisher = {
      _id: new Types.ObjectId(id),
      name: 'EA Games',
      siret: 2,
      phone: '+5511999999999',
    };

    it('should return a publisher by id', async () => {
      await dbConnection.collection('publishers').insertOne(publisher);
      const response = await request(httpServer).get(`/publisher/${id}`);

      expect(response.status).toBe(200);
      let data = response.body.data;
      expect({
        name: data.name,
        siret: data.siret,
        phone: data.phone,
      }).toMatchObject({
        name: publisher.name,
        siret: publisher.siret,
        phone: publisher.phone,
      });
    });
  });

  describe('NOT FOUND GET publisher/{id}}', () => {
    //INVALID ID
    let id = '64de989732d0f092dc54ed01';

    it('should return a publisher by id', async () => {
      const response = await request(httpServer).get(`/publisher/${id}`);
      expect(response.status).toBe(404);
    });
  });

  describe('SUCESS GET publisher/getAll', () => {
    let id = '64de989732d0f092dc54ed0a';

    let publisher = {
      _id: new Types.ObjectId(id),
      name: 'EA Games',
      siret: 2,
      phone: '+5511999999999',
    };

    it('should return all publishers', async () => {
      await dbConnection.collection('publishers').deleteMany({});
      await dbConnection.collection('publishers').insertOne(publisher);
      const response = await request(httpServer).get(`/publisher/getAll`);

      expect(response.status).toBe(200);
      let data = response.body.data;
      expect({
        name: data[0].name,
        siret: data[0].siret,
        phone: data[0].phone,
      }).toMatchObject({
        name: publisher.name,
        siret: publisher.siret,
        phone: publisher.phone,
      });
    });
  }); 


  /*
   * publisher - UPDATE - 200 - 400 - 500
   */

  describe('SUCESSO - publishers/update', () => {
    let id = '64de989732d0f092dc54ed0a';

    it('should return the updated publisher', async () => {
      let publisher = {
        _id: new Types.ObjectId(id),
        name: 'EA Games',
        siret: 2,
        phone: '+5511999999999',
      };

      await dbConnection.collection('publishers').insertOne(publisher);

      publisher.name = 'EA Games (Update)';

      const response = await request(httpServer)
        .put(`/publisher/${id}`, () => {})
        .send(publisher);

      expect(response.status).toBe(200);
      expect({
        title: response.body.data.name,
        price: response.body.data.siret,
        tags: response.body.data.phone,
      }).toMatchObject({
        title: publisher.name,
        price: publisher.siret,
        tags: publisher.phone,
      });
    });
  });

  describe('404 - NOT FOUND - publishers/update', () => {
    let id = '64de989732d0f092dc54ed0a';

    it('should return the updated publisher', async () => {
      let publisher = {
        _id: new Types.ObjectId(id),
        name: 'EA Games',
        siret: 2,
        phone: '+5511999999999',
      };

      await dbConnection.collection('publishers').insertOne(publisher);
      //IT'S DIFFERENT FROM THE PREVIOUS
      let idSearch = '64de989732d0f092dc54ed01';

      publisher.name = 'EA Games (Update)';

      const response = await request(httpServer)
        .put(`/publisher/${idSearch}`, () => {})
        .send(publisher);

      expect(response.status).toBe(404);

    });
  });

  /*
   * publisher - UPDATE - 200 - 404 
   */
  describe('SUCESS DELETE publisher/{id}}', () => {
    let id = '64de989732d0f092dc54ed0a';

    let publisher = {
      _id: new Types.ObjectId(id),
      name: 'EA Games',
      siret: 2,
      phone: '+5511999999999',
    };

    it('should return a publisher by id', async () => {
      await dbConnection.collection('publishers').insertOne(publisher);
      const response = await request(httpServer).delete(`/publisher/${id}`);

      expect(response.status).toBe(200);
      let data = response.body.data;
      expect({
        name: data.name,
        siret: data.siret,
        phone: data.phone,
      }).toMatchObject({
        name: publisher.name,
        siret: publisher.siret,
        phone: publisher.phone,
      });
    });
  });

  describe('404 DELETE publisher/{id}}', () => {
    let id = '64de989732d0f092dc54ed0a';

    let publisher = {
      _id: new Types.ObjectId(id),
      name: 'EA Games',
      siret: 2,
      phone: '+5511999999999',
    };

    it('publisher - delete - should return 404 code', async () => {
      await dbConnection.collection('publishers').insertOne(publisher);
      //DIFFERENT FROM THE PREVIOUS ID
      let idSearch = '64de989732d0f092dc54ed01';
      const response = await request(httpServer).delete(`/publisher/${idSearch}`);
      expect(response.status).toBe(404);
    
    });
  });



});
