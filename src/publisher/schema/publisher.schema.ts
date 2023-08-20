import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PublisherDocument = Publisher & Document;

@Schema()
export class Publisher{
    //@Prop({ type: SchemaTypes.ObjectId })
    _id: string;  
    @Prop() 
    name: string; 
    @Prop()
    siret: number;
    @Prop()
    phone: string;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);