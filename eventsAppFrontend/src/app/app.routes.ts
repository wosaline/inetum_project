import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';

//on va definir les routes

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponentComponent },
];
