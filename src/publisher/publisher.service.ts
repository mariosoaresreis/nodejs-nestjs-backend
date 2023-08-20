import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publisher } from './schema/publisher.schema';
import { PublisherDTO } from './dto/publisher.dto';

@Injectable()
export class PublisherService {
    private readonly logger = new Logger(PublisherService.name);
   
    constructor(@InjectModel('Publisher') private publisherRepository: Model<Publisher>) { }

    async createPublisher(publisherDTO: PublisherDTO): Promise<Publisher> {
        const publisher = new this.publisherRepository(publisherDTO);
        return await publisher.save();
    }

    async deletePublisher(publisherID: string): Promise<Publisher> {
        const publisher = await this.publisherRepository.findById(publisherID);

        if (!publisher){
           throw new NotFoundException();
        }

        const deletedPublisher = await this.publisherRepository.findByIdAndDelete(publisherID).exec();            
        return deletedPublisher;
    }

    async getPublisher(publisherID: string): Promise<Publisher> {
        const publisher = await this.publisherRepository.findById(publisherID).exec();

        if (!publisher){
            throw new NotFoundException();
        }


        return publisher;
    }

    async getPublishers(): Promise<Publisher[]> {
        const publishers = await this.publisherRepository.find().exec();

        if (!publishers){
            throw new NotFoundException();
        }

        return publishers;
    }

    async updatePublisher(publisherID: string, publisherDTO: PublisherDTO): Promise<Publisher> {
        const publisher = await this.publisherRepository.findById(publisherID);

        if (!publisher){
            throw new NotFoundException();
        }

        const updatedPublisher = await this.publisherRepository.findByIdAndUpdate(publisherID,
                                                                   publisherDTO,
                                                                   { new: true }).exec();
                                                                   
        return updatedPublisher;
    }
}
