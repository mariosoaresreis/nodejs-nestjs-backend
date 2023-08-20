import { Test } from '@nestjs/testing';
import { publishStub } from './stubs/publish.stub';
import { PublisherController } from '../publisher.controller';
import { PublisherService } from '../publisher.service';
import { PublisherDTO } from '../../publisher/dto/publisher.dto';
import { createPublishStub } from './stubs/create-publish.stub';
jest.mock('../publisher.service');

describe('PublisherController', () => {
  let publisherController: PublisherController;
  let publisherService: PublisherService;
  var httpMocks = require('node-mocks-http');

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [PublisherController],
      providers: [PublisherService],
    }).compile();

    publisherController = moduleRef.get<PublisherController>(PublisherController);
    publisherService = moduleRef.get<PublisherService>(PublisherService);
    jest.clearAllMocks();
  });

  describe('getPublsher', () => {
    describe('when getPublisher is called', () => {
      let publisher: JSON;

      beforeEach(async () => {
        publisher = await publisherController.getPublisherById(
          httpMocks.createResponse(),
          publishStub()._id,
        );
      });

      test('then it should call publisherService', () => {
        expect(publisherService.getPublisher).toBeCalledWith(publishStub()._id);
      });
    });
  });

  describe('getPublishers', () => {
    describe('when getPublisher is called', () => {
      let publishers: JSON;

      beforeEach(async () => {
        publishers = await publisherController.getAllPublishers(httpMocks.createResponse());
      });

      test('then it should call publisherService', () => {
        expect(publisherService.getPublishers).toHaveBeenCalled();
      });
    });
  });

  describe('createPublisher', () => {
    describe('when createPublisher is called', () => {
      let publisher: JSON;

      beforeEach(async () => {
        const createPublisherDto = {
          _id: null,
          name: 'name',
          siret: 1,
          phone: '+5511999999999',
        };
        publisher = await publisherController.createPublisher(
          httpMocks.createResponse(),
          createPublisherDto,
        );
      });

      test('then it should call publisherService', () => {
        expect(publisherService.createPublisher).toHaveBeenCalledWith(
          createPublishStub(),
        );
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let publisher: JSON;
      let updatePublisherDto: PublisherDTO;

      beforeEach(async () => {
        updatePublisherDto = {
            _id: '1',
            name: 'name',
            siret: 1,
            phone: '+5511999999999'
        };
        publisher = await publisherController.updatePublisher(
          httpMocks.createResponse(),
          updatePublisherDto,
          publishStub()._id,
        );
      });

      test('then it should call usersService', () => {
        expect(publisherService.updatePublisher).toHaveBeenCalledWith(
            publishStub()._id,
            updatePublisherDto,
        );
      });
    });
  });
});
