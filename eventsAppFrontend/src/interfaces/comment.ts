import { Event } from "./event";
import { User } from "./user";

export interface Comment {
    id?: number;
    event?:Event;
    user?:User;
    eventId?:number;
    userId?:number;
    content:string;
    createdAt?:Date;
    updatedAt?:Date;
    rating:number;
}
