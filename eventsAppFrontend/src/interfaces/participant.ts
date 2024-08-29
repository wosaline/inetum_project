import { Event } from "./event";
import { User } from "./user";

export interface Participant {
    id?:number;
    user?:User;
    userId?:number;
    event?:Event;
    eventId?:number;
    invitedAt?:Date;
    respondedAt?:Date;
    status:string;
}
