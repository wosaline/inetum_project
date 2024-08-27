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
    mappingMarkedDates: this.baseUrl + `/events/dates`,
  };

  constructor(private webApiService: WebAPIService) {}

  getAllEvents() {
    return this.webApiService.get(this.httpLinks.mappingEvents);
  }
  getMarkedDates(year: number, month: number, userId: number) {
    return this.webApiService.get(
      this.httpLinks.mappingMarkedDates + `/${year}/${month}/${userId}`
    );
  }

  postEvent(event: Event) {
    return this.webApiService.post(this.httpLinks.mappingEvents, event, true);
  }

  putEvent(event: Event) {
    return this.webApiService.put(
      this.httpLinks.mappingEvents + `/${event.id}`,
      event,
      true
    );
  }

  deleteEvent(id: number) {
    return this.webApiService.delete(this.httpLinks.mappingEvents + `/${id}`);
  }

  createUser(user: User) {
    return this.webApiService.post(this.httpLinks.mappingUsers, user, false);
  }
}
