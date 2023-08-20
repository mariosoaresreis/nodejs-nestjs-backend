import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsNumberString, IsPhoneNumber, MinLength} from "class-validator";

export class PublisherDTO {
    _id: string;    
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    name: string;    
    @IsNumberString()
    @MinLength(5)
    @ApiProperty()
    siret: number;
   @IsPhoneNumber()
   @MinLength(11)
   @ApiProperty()
    phone: string;
}