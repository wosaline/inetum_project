// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Si l'utilisateur est admin, autoriser l'accès à la route
    if (this.authService.isAdmin()) {
      return true;
    }

    // Si l'utilisateur n'est pas admin, redirigez-le vers une autre page (ex: home)
    this.router.navigate(['/']);
    return false;
  }
}
