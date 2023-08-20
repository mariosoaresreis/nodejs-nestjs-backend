import { Model } from "mongoose";

export class PublisherModel extends Model<PublisherModel>{
    _id: string;   
    name: string; 
    siret: number;
    phone: string;
}