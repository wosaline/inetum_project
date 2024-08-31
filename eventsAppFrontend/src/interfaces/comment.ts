import { Event } from "./event";
import { User } from "./user";

export interface CommentFromClient {
    id: number;
    event:Event;
    user:User;
    content:string;
    createdAt:Date;
    updatedAt:Date;
    rating:number;
}

export interface CommentToClient {
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