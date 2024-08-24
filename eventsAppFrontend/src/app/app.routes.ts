import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

//on va definir les routes

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponentComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
];
