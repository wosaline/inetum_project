import { Injectable } from '@angular/core';
import { WebAPIService } from './web-api.service';
import { User } from '../interfaces/user';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  private baseUrl = 'http://localhost:8080';
  private httpLinks = {
    mappingEvents: this.baseUrl + '/events',
    mappingUsers: this.baseUrl + '/users',
    mappingComments: this.baseUrl + '/comments'
  };

  constructor(private webApiService: WebAPIService) {}

  getAllEvents() {
    return this.webApiService.get(this.httpLinks.mappingEvents);
  }

  getEventById(id : number){
    return this.webApiService.get(this.httpLinks.mappingEvents+`/${id}`);
  }

  postEvent(event: Event) {
    return this.webApiService.post(this.httpLinks.mappingEvents, event, true);
  }

  putEvent(event: Event){
    return this.webApiService.put(this.httpLinks.mappingEvents+`/${event.id}`, event, true);
  }

  deleteEvent(id: number){
    return this.webApiService.delete(this.httpLinks.mappingEvents+`/${id}`);
  }

  createUser(user: User) {
    return this.webApiService.post(this.httpLinks.mappingUsers, user, false);
  }

  getAllCommentsByEventId(id:number){
    return this.webApiService.get(this.httpLinks.mappingComments+`/${id}`);
  }
}
