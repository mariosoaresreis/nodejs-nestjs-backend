import { Document, SchemaTypes } from 'mongoose';
import { Publisher } from '../../publisher/schema/publisher.schema'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type GameDocument = Game & Document;

@Schema()
export class Game {
    //@Prop({ type: SchemaTypes.ObjectId })
    //@Field(() => ID,{ nullable: true })
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

function Field(arg0: () => any, arg1: { nullable: boolean; }): (target: Game, propertyKey: "_id") => void {
    throw new Error('Function not implemented.');
}
