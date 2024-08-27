import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
    this.user = JSON.parse(localStorage.getItem('eventAppUser') || '{}').user;
    this.isAdmin = this.user.role === 'admin';

    this.profileForm = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [{ value: '********', disabled: true }],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      role: [{ value: this.user.role, disabled: true }],
    });

    this.toggleEditMode(false);
  }

  toggleEditMode(enable: boolean) {
    this.isEditing = enable;
    if (this.isEditing && this.isAdmin) {
      this.profileForm.get('username')?.enable();
      this.profileForm.get('email')?.enable();
      this.profileForm.get('firstName')?.enable();
      this.profileForm.get('lastName')?.enable();
    } else {
      this.profileForm.get('username')?.disable();
      this.profileForm.get('email')?.disable();
      this.profileForm.get('firstName')?.disable();
      this.profileForm.get('lastName')?.disable();
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
    this.profileForm.reset({
      username: this.user.username,
      email: this.user.email,
      password: '********',
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      role: this.user.role,
    });
    this.toggleEditMode(false);
  }

  // Permet d'ajouter la méthode updateUserProfile
  private updateUserProfile(data: Partial<any>): Observable<any> {
    const userId = this.user.id;
    return this.http.put<any>(`${this.baseUrl}/users/${userId}`, data);
  }
}
