import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserProfileComponent } from '../app/user-profile/user-profile.component';

interface UserProfile {
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

  login(email: string, password: string): Observable<UserProfile> {
    return this.http
      .post<UserProfile>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          // Stocker l'utilisateur dans le localStorage
          localStorage.setItem('eventAppUser', JSON.stringify(response));
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem('eventAppUser');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('eventAppUser');
  }

  getUserData(): UserProfile | null {
    const user = localStorage.getItem('eventAppUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log('Parsed User Data:', parsedUser); // Ajout de console pour vérifier les données
      return parsedUser as UserProfile;
    }
    return null;
  }

  updateUserProfile(data: Partial<UserProfile>): Observable<UserProfile> {
    const userId = this.getUserData()?.id;

    if (!userId) {
      // console.error('User ID is missing or invalid.');
      throw new Error('User ID is missing or invalid.');
    }

    return this.http
      .put<UserProfile>(`${this.baseUrl}/users/${userId}`, data)
      .pipe(
        tap((updatedUser) => {
          localStorage.setItem('eventAppUser', JSON.stringify(updatedUser));
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => error);
  }
}
