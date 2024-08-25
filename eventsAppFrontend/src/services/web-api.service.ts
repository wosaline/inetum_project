import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class WebAPIService {
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

  post(url: string, obj: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    console.log(obj);
    let body = new HttpParams();
    for (const key of Object.keys(obj)) {
      body = body.set(key, obj[key]);
    }
    return this.httpClient.post<any>(url, body.toString(), httpOptions);
  }

  put(url: string, obj: any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    console.log(obj);
    let body = new HttpParams();
    for (const key of Object.keys(obj)) {
      body = body.set(key, obj[key]);
    }
    return this.httpClient.put<any>(url, body.toString(), httpOptions);
  }

  delete(url: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.delete<any>(url, httpOptions);
  }
}
