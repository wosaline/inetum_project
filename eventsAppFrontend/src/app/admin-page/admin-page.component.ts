import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EventsListComponent } from '../events-list/events-list.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    NavbarComponent,
    EventsListComponent,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {}
