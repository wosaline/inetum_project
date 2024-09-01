import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EventsListComponent } from '../events-list/events-list.component';
import { HttpProviderService } from '../../services/http-provider.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [NavbarComponent, EventsListComponent, FormsModule, CommonModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
})
export class HomeComponentComponent implements OnInit {
  eventsList: any[] = [];
  loading: boolean = true;
  isLoggedIn: boolean = false;
  showPrivateEvents: boolean = true;

  constructor(private httpProviderService: HttpProviderService, private authService: AuthService) {}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.loadEvents();
  }

  loadEvents() {
    this.loading = true;
    
    if (this.isLoggedIn && this.showPrivateEvents) {
      this.httpProviderService.getAllEvents().subscribe(
        (res) => {
          this.eventsList = res.body || [];
          console.log('Events:', this.eventsList);
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching events:', error);
          this.loading = false;
        }
      );
    } else {
      this.httpProviderService.getAllPublicEvents().subscribe(
        (res) => {
          this.eventsList = res.body || [];
          console.log('Events:', this.eventsList);
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching events:', error);
          this.loading = false;
        }
      );
    }
  }
}