import { Component, OnInit } from '@angular/core';
import { AdminPageComponent } from '../admin-page.component';
import { HttpProviderService } from '../../../services/http-provider.service';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../avatar/avatar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [
    AdminPageComponent,
    CommonModule,
    AvatarComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css',
})
export class UsersManagementComponent implements OnInit {
  usersList: any[] = [];
  loading: boolean = true;
  constructor(private httpProviderService: HttpProviderService) {}
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.httpProviderService.getAllUsers().subscribe(
      (res) => {
        this.usersList = res.body || [];
        console.log('users:', this.usersList);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    );
  }

  deleteUser(userId?: number): void {
    console.log('userId to delete', userId);
    if (userId) {
      this.httpProviderService
        .deleteUser(userId)
        .subscribe(() => this.loadUsers());
    }
  }
}
