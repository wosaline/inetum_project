import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { AvatarComponent } from '../avatar/avatar.component';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuTrigger,
    MatMenu,
    AvatarComponent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) {}
  isLoggedIn = false;
  user !: User;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    console.log('isLoggedIn in navbar', this.isLoggedIn);

    const userString = localStorage.getItem('eventAppUser');
    if (userString) {
        const userObject = JSON.parse(userString);
        this.user = userObject as User;
    }
  }

  handleClick(): void {
    this.authService.logout();
    this.isLoggedIn = this.authService.isAuthenticated();
  }

}
