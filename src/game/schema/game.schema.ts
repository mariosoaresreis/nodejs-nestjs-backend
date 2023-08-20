import { Document, SchemaTypes } from 'mongoose';
import { Publisher } from '../../publisher/schema/publisher.schema'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type GameDocument = Game & Document;

@Schema()
export class Game {
    @Prop({ type: SchemaTypes.ObjectId })
    _id: string;
    @Prop()
    title: string;
    @Prop()
    price: number;
    @Prop({type: Publisher})
    publisher: Publisher;
    @Prop()
    tags: string[];
    @Prop()
    releaseDate: Date
    @Prop()
    discountApplied: Boolean;
}

export const GameSchema = SchemaFactory.createForClass(Game);