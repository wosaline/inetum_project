import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { RegisterComponent } from './register/register.component';
import { EventPageComponent } from './event-page/event-page.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { EventViewComponent } from './event-view/event-view.component';

//on va definir les routes

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'event-page', component: EventPageComponent},
  { path: 'event/:eventId/user/:userId', component: EventViewComponent},
];

export class AppRoutingModule {}
