import { Event } from "./event";
import { User } from "./user";
import { ParticipantStatus } from "./participantStatus";

export interface Participant {
    id?:number;
    user?:User;
    userId?:number;
    event?:Event;
    eventId?:number;
    invitedAt?:Date;
    respondedAt?:Date;
    status:ParticipantStatus|string;
}
