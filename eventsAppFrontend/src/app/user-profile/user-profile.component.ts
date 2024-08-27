import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec les informations de l'utilisateur
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [{ value: '', disabled: true }, Validators.required], // Mot de passe caché
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.loadUserData();
  }

  loadUserData() {
    const userData = this.authService.getUserData();
    if (userData) {
      this.profileForm.patchValue(userData);
    }
  }

  onSave() {
    if (this.profileForm.valid && !this.profileForm.pristine) {
      // Logique de sauvegarde des données de l'utilisateur
      this.authService.updateUserProfile(this.profileForm.value).subscribe(
        (response) => {
          alert('Profile updated successfully');
        },
        (error) => {
          alert('Failed to update profile');
        }
      );
    }
  }

  onCancel() {
    this.profileForm.reset(this.authService.getUserData());
  }
}
