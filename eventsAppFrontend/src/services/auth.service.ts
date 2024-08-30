import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';

interface LoginResponse {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:8080';
  user!: User;
  constructor(private http: HttpClient) {
    const userString: string | null = localStorage.getItem('eventAppUser'); // Add type string | null
    if (userString) {
      const userObject = JSON.parse(userString);
      this.user = userObject as User; // Explicit cast to User
    }
  }

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
          this.user = response;
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
    return !!localStorage.getItem('eventAppUser');
  }

  getUserRole(): string {
    return this.user.role;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
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
