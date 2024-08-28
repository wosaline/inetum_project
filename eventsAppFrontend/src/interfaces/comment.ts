import { Event } from "./event";
import { User } from "./user";

export interface Comment {
    id?: number;
    event:Event;
    user:User;
    content:string;
    createdAt?:Date;
    updatedAt?:Date;
    rating:number;
}
