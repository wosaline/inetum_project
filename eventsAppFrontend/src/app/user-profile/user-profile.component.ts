import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpProviderService } from '../../services/http-provider.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  editMode: boolean = false;
  successMessage: string = '';

  errorMessage: string | null = null;

  user!: User;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpProviderService: HttpProviderService
  )
    {
      // Initialisation du formulaire avec les champs requis
      this.profileForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        role: [{ value: '', disabled: true }, Validators.required] // field 'role'disabled
      });
  }

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur stockées dans localStorage
    const userString = localStorage.getItem('eventAppUser');
    if (userString) {
      this.user = JSON.parse(userString) as User;
      
      // Prérentrer les informations dans le formulaire
      this.profileForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        role: this.user.role,
      });
    }

    // Détection des modifications dans le formulaire pour activer le mode édition
    this.profileForm.valueChanges.subscribe(() => {
      this.editMode = this.profileForm.dirty;
    });
  }

  onSaveChanges(): void {
    if (this.profileForm.valid && this.editMode) {
      const updatedUser = { ...this.user, ...this.profileForm.value };
      
      // Appel à l'API pour mettre à jour les informations utilisateur
      this.httpProviderService.putUser(updatedUser).subscribe({
        next: (response) => {
          // Mise à jour réussie, désactivation du mode édition
          this.editMode = false;
          console.log('User updated successfully', response);
          // Mettez à jour le localStorage avec les nouvelles informations utilisateur
          localStorage.setItem('eventAppUser', JSON.stringify(updatedUser));
        },
        error: (error) => {
          console.error('Error updating user', error);
        }
      });
    }
  }
}
