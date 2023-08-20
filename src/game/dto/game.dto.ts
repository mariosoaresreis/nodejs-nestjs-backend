import { ApiProperty } from "@nestjs/swagger";
import { PublisherDTO } from "../../publisher/dto/publisher.dto";
import {IsNotEmpty, IsNumberString, MinLength} from "class-validator";

export class GameDTO {    
    _id: string;
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    title: string;
    @IsNumberString()    
    @ApiProperty()
    price: number;
    @IsNotEmpty()
    @ApiProperty()
    publisher: PublisherDTO;
    @ApiProperty()
    tags: string[];
    @ApiProperty()
    releaseDate: Date;   
    discountApplied: Boolean;
}