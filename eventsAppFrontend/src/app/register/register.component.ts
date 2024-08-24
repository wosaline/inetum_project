import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpProviderService } from '../../services/http-provider.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private httpProviderService: HttpProviderService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      },
    );
  }


  onSubmit() {
    if (this.registerForm.valid) {
        const user: User = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        passwordHash: this.registerForm.value.password,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        role: 'USER', // Rôle par défaut
      }

      this.httpProviderService.createUser(user).subscribe(
        response => {
          console.log('User created successfully', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error creating user', error);
        }
      );
        
    }else{
      console.log("Form incomplete?");
    }
  }
}
