import { Injectable } from '@angular/core';
import { WebAPIService } from './web-api.service';

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  private baseUrl = 'http://localhost:8080';
  private httpLinks = {
    getAllEvents: this.baseUrl + '/events',
  };

  constructor(private webApiService: WebAPIService) {}

  getAllEvents() {
    return this.webApiService.get(this.httpLinks.getAllEvents);
  }
}
