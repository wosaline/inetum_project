import { Injectable } from '@angular/core';
import { WebAPIService } from './web-api.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  private baseUrl = 'http://localhost:8080';
  private httpLinks = {
    getAllEvents: this.baseUrl + '/events',
    mappingUsers: this.baseUrl + '/users',
  };

  constructor(private webApiService: WebAPIService) {}

  getAllEvents() {
    return this.webApiService.get(this.httpLinks.getAllEvents);
  }

  createUser(user: User) {
    return this.webApiService.post(this.httpLinks.mappingUsers, this.webApiService.convertUserToFormData(user));
  }
}
