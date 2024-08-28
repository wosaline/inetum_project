import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EventsListComponent } from '../events-list/events-list.component';
import { HttpProviderService } from '../../services/http-provider.service';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [NavbarComponent, EventsListComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
})
export class HomeComponentComponent implements OnInit {
  eventsList: any[] = [];
  loading: boolean = true;

  constructor(private httpProviderService: HttpProviderService) {}
  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
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
  }
}
