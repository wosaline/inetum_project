import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.baseUrl}/login?email=${email}&password=${password}`,
        {}
      )
      .pipe(
        tap((response) => {
          // Stocker le user dans le localStorage ou un autre mécanisme de stockage
          localStorage.setItem('eventAppUser', JSON.stringify(response));
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    // Supprimer le user du stockage
    localStorage.removeItem('eventAppUser');
    this.isAuthenticated();
  }

  isAuthenticated(): boolean {
    // Vérifier si le token existe et est valide
    return !!localStorage.getItem('eventAppUser');
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => error);
  }
}
