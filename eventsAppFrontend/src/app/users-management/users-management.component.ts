import { Component, OnInit } from '@angular/core';
import { AdminPageComponent } from '../admin-page/admin-page.component';
import { HttpProviderService } from '../../services/http-provider.service';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../interfaces/user';

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
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css',
})
export class UsersManagementComponent implements OnInit {
  usersList: User[] = [];
  loading: boolean = true;
  roles: Array<String> = ['USER', 'ADMIN'];
  editMode: boolean = false;
  selectedRole: string = '';
  selectedUser: any;
  constructor(private httpProviderService: HttpProviderService) {}
  ngOnInit(): void {
    const userString = localStorage.getItem('eventAppUser');

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

  onEdit = (user: User) => {
    this.editMode = true;
    this.selectedUser = user;
    console.log('selectedUser', this.selectedUser);
  };
  onCancel = () => {
    this.editMode = false;
    this.selectedUser = null;
  };
  onConfirm = (userId?: number) => {};

  // updateUserRole(userId?: number, role: String): void {
  //   console.log('userId to modify', userId);
  //   if (userId) {
  //     this.httpProviderService
  //       .putUser(userId)
  //       .subscribe(() => this.loadUsers());
  //   }
  // }
}
