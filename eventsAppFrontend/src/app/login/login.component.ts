import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpProviderService } from '../../services/http-provider.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  isLoading = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private httpProviderService: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = '';

    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        this.isLoading = false;
        console.log('response', response);
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']); // Redirige l'admin vers /admin
        } else {
          this.router.navigate(['/home']); // Redirige les autres utilisateurs vers une autre page
        }
        // this.router.navigate(['/home']);
      },
      (error) => {
        this.isLoading = false;
        if (error.status === 401) {
          // Si le back-end renvoie une erreur 401
          this.errorMessage = 'Identifiants incorrects';
        } else {
          console.error('Error login user', error);
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
      }
    );
  }
}
