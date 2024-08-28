import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user: any;
  isAdmin: boolean = false;
  isEditing: boolean = false;
  private baseUrl = 'http://localhost:8080/api';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur stockées dans localStorage
    this.loadUserData();
    this.initializeForm();
  }

  loadUserData(): void {
    const userFromStorage = localStorage.getItem('eventAppUser');
    if (userFromStorage) {
      this.user = JSON.parse(userFromStorage).user;
      this.isAdmin = this.user.role === 'admin';
    }
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      username: [
        { value: this.user.username, disabled: !this.isAdmin },
        Validators.required,
      ],
      email: [
        { value: this.user.email, disabled: !this.isAdmin },
        [Validators.required, Validators.email],
      ],
      password: [{ value: '********', disabled: true }],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      role: [{ value: this.user.role, disabled: this.user.role !== 'admin' }],
    });
  }

  toggleEditMode(enable: boolean) {
    this.isEditing = enable;
    if (this.isEditing) {
      this.profileForm.get('firstName')?.enable();
      this.profileForm.get('lastName')?.enable();
      if (this.isAdmin) {
        this.profileForm.get('username')?.enable();
        this.profileForm.get('email')?.enable();
      }
      this.setRoleFieldState(); // Vérifiez l'état du champ `role` lors de l'édition
    } else {
      this.profileForm.get('username')?.disable();
      this.profileForm.get('email')?.disable();
      this.profileForm.get('firstName')?.disable();
      this.profileForm.get('lastName')?.disable();
    }
  }

  setRoleFieldState() {
    if (this.user.role === 'admin') {
      this.profileForm.get('role')?.enable();
    } else {
      this.profileForm.get('role')?.disable();
    }
  }

  onSave() {
    if (this.profileForm.valid && this.isEditing) {
      this.updateUserProfile(this.profileForm.value).subscribe(
        (response) => {
          alert('Profile updated successfully');
          this.user = response;
          localStorage.setItem(
            'eventAppUser',
            JSON.stringify({ user: this.user })
          );
          this.toggleEditMode(false);
        },
        (error) => {
          alert('Failed to update profile');
        }
      );
    }
  }

  onCancel() {
    // Réinitialisation avec désactivation du mode édition
    this.initializeForm();
    this.toggleEditMode(false);
  }

  private updateUserProfile(data: any) {
    const userId = this.user.id;
    return this.http.put<any>(`${this.baseUrl}/users/${userId}`, data); // Appel direct au backend
  }
}
