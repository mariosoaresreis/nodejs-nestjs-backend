import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { PublisherSchema } from './schema/publisher.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Publisher', schema: PublisherSchema}
    ])
  ],
  controllers: [PublisherController],
  providers: [PublisherService]
})
export class PublisherModule {}
