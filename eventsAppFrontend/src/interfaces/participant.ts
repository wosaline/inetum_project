import { Event } from "./event";
import { User } from "./user";
import { ParticipantStatus } from "./ParticipantStatus";

export interface Participant {
    id: number;
    user: User;
    event: Event;
    invitedAt?: Date;
    respondedAt?: Date;
    status: ParticipantStatus;
}