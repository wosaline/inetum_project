import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class WebAPIService {
  constructor(private httpClient: HttpClient) {}

  public convertUserToFormData(user: User): FormData {
    const formData = new FormData();
    console.log(user);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('passwordHash', user.passwordHash);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('role', user.role);
    return formData;
  }

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

  post(url: string, obj: FormData): Observable<any>{
    console.log(obj);
    return this.httpClient.post<any>(url, obj);
  }
}
