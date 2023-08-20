import { Test, TestingModule } from '@nestjs/testing';
import { PublisherService } from '../publisher.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Publisher, PublisherDocument } from '../schema/publisher.schema';
import { createMock } from '@golevelup/ts-jest';
import { PublisherDTO } from '../dto/publisher.dto';

const mockPublisher = (): Publisher => ({
  _id: '64dbca73a88591c5c5ab6990',
  name: 'NAME',
  siret: 1,
  phone: '+5511999999999',
});

const mockPublisherDoc = (
  mock?: Partial<Publisher>,
): Partial<PublisherDocument> => ({
  _id: '64dbca73a88591c5c5ab6990',
  name: 'NAME',
  siret: 1,
  phone: '+5511999999999',
});

const publisherDocArray: Partial<PublisherDocument>[] = [
  mockPublisherDoc(),
  mockPublisherDoc(),
];

const publisherArray = [mockPublisher(), mockPublisher()];

describe('PublisherService', () => {
  let service: PublisherService;
  let publisherRepository: Model<Publisher>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PublisherService,
        {
          provide: getModelToken(Publisher.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockPublisher()),
            constructor: jest.fn().mockResolvedValue(mockPublisher()),
            findByIdAndUpdate: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<PublisherService>(PublisherService);
    publisherRepository = moduleRef.get<Model<Publisher>>(
      getModelToken('Publisher'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all publishers', async () => {
    jest.spyOn(publisherRepository, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(publisherDocArray),
    } as unknown as Query<PublisherDocument[], PublisherDocument>);
    const publishers = await service.getPublishers();
    expect(publishers.length).toEqual(publisherArray.length);
  });

  it('should findById - publisher', async () => {
    jest.spyOn(publisherRepository, 'findById').mockReturnValueOnce(
      createMock<Query<PublisherDocument, PublisherDocument>>({
        exec: jest.fn().mockResolvedValueOnce(
          mockPublisherDoc({
            _id: '64dbca73a88591c5c5ab6990',
            name: 'NAME',
            siret: 1,
            phone: '+5511999999999',
          }),
        ),
      }),
    );
    const findMockPublisher = mockPublisher();
    const foundGame = await service.getPublisher('64dbca73a88591c5c5ab6990');
    expect(foundGame).toEqual(findMockPublisher);
  });

  it('should update a publisher successfully', async () => {
    jest.spyOn(publisherRepository, 'findByIdAndUpdate').mockReturnValueOnce(
      createMock<Query<PublisherDocument, PublisherDocument>>({
        exec: jest.fn().mockResolvedValueOnce({
          _id: '64dbca73a88591c5c5ab6990',
          name: 'NAME',
          siret: 1,
          phone: '+5511999999999',
        }),
      }),
    );

    jest.spyOn(publisherRepository, 'findById').mockReturnValueOnce(
        createMock<Query<PublisherDocument, PublisherDocument>>({
          exec: jest.fn().mockResolvedValueOnce({
            _id: '64dbca73a88591c5c5ab6990',
            name: 'NAME',
            siret: 1,
            phone: '+5511999999999',
          }),
        }),
      );

    const publisherDTO: PublisherDTO = {
      _id: '64dbca73a88591c5c5ab6990',
      name: 'NAME',
      siret: 1,
      phone: '+5511999999999',
    };

    const updatedPublisher = await service.updatePublisher('id', publisherDTO);

    expect(updatedPublisher).toEqual({
      _id: '64dbca73a88591c5c5ab6990',
      name: 'NAME',
      siret: 1,
      phone: '+5511999999999',
    });
  });

  it('should delete a publisher successfully', async () => {
    jest.spyOn(publisherRepository, 'findByIdAndDelete').mockReturnValueOnce(
      createMock<Query<PublisherDocument, PublisherDocument>>({
        exec: jest.fn().mockResolvedValueOnce({
          _id: '64dbca73a88591c5c5ab6990',
          name: 'NAME',
          siret: 1,
          phone: '+5511999999999',
        }),
      }),
    );

    jest.spyOn(publisherRepository, 'findById').mockReturnValueOnce(
      createMock<Query<PublisherDocument, PublisherDocument>>({
        exec: jest.fn().mockResolvedValueOnce({
          _id: '64dbca73a88591c5c5ab6990',
          name: 'NAME',
          siret: 1,
          phone: '+5511999999999',
        }),
      }),
    );

    const deletedPublisher = await service.deletePublisher('a bad id');
    expect(deletedPublisher).toEqual(mockPublisher());
  });
});
