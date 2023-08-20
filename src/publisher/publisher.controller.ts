import { Controller, Delete, Get, Post, Put, Res, HttpStatus, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { PublisherDTO } from './dto/publisher.dto';
import { PublisherService } from './publisher.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';


@Controller('publisher')
@ApiTags('Publishers')
export class PublisherController {

    constructor(private publisherService: PublisherService) {}

    @Post('/create')
    @ApiBody({ type: PublisherDTO })
    @UsePipes(new ValidationPipe({ transform: true }))
    async createPublisher(@Res() res, @Body() publisherDTO: PublisherDTO): Promise<JSON> {
        const createdPublisher = await this.publisherService.createPublisher(publisherDTO);

        return res.status(HttpStatus.CREATED).json({
            data: createdPublisher,
            message: 'Publisher was successfully created.',
            status: HttpStatus.CREATED
        });
    }

    @Delete('/:id')
    @ApiParam({name: 'id', required: true, description: 'Publisher ID'})
    async deletePublisher(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const deletedPublisher = await this.publisherService.deletePublisher(id);
            jsonResponse = {
                data: deletedPublisher,
                message: `Publisher with id ${id} was deleted.`,
                status: HttpStatus.OK
            }
        } catch(error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Publisher with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }

    @Get('/getAll')
    async getAllPublishers(@Res() res): Promise<JSON> {
        const publishers = await this.publisherService.getPublishers();

        return res.status(HttpStatus.OK).json({
            data: publishers,
            message: 'Returning all publishers.',
            status: HttpStatus.OK
        });
    }

    @Get('/:id')
    @ApiParam({name: 'id', required: true, description: 'Publisher ID'})
    async getPublisherById(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const publisher = await this.publisherService.getPublisher(id);
            jsonResponse = {
                data: publisher,
                message: `Returning publisher ${id}.`,
                status: HttpStatus.OK
            }
        } catch(error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Publisher with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }

    @Put(':id')
    @ApiBody({ type: PublisherDTO })
    @ApiParam({name: 'id', required: true, description: 'Publisher ID'})
    async updatePublisher(@Res() res, @Body() publisherDTO: PublisherDTO, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const publisher = await this.publisherService.updatePublisher(id, publisherDTO);
            jsonResponse = {
                data: publisher,
                message: `Returning updated publisher ${id}.`,
                status: HttpStatus.OK
            }
        } catch(error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Publisher with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }
}
