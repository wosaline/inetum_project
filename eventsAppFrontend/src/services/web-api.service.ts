import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class WebAPIService {
  // Generic requests, can be used for any interface

  constructor(private httpClient: HttpClient) {}

  get(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      }),
      observe: 'response' as 'body',
    };
    return this.httpClient.get(url, httpOptions);
  }

  post(url: string, obj: any, isRequestParam: boolean): Observable<any> {
    let httpOptions;
    console.log(obj);
    if (isRequestParam) {
      let body = new HttpParams();
      for (const key of Object.keys(obj)) {
        body = body.set(key, obj[key]);
      }
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      };
      return this.httpClient.post<any>(url, body.toString(), httpOptions);
    } else {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      return this.httpClient.post<any>(url, obj, httpOptions);
    }
  }

  put(url: string, obj: any, isRequestParam: boolean): Observable<any> {
    let httpOptions;

    if (isRequestParam) {
      // Build URL with query parameters
      const params = new HttpParams({ fromObject: obj }); // Create HttpParams from the object
      const urlWithParams = `${url}?${params.toString()}`; // Append params to URL

      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json', // You can keep Content-Type as JSON for query parameters
        }),
      };

      // Perform PUT request with URL containing query parameters
      return this.httpClient.put<any>(urlWithParams, {}, httpOptions); // Empty body as data is in query params
    } else {
      // Handle as regular JSON body request
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      return this.httpClient.put<any>(url, obj, httpOptions);
    }
  }

  delete(url: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.delete<any>(url, httpOptions);
  }
}
