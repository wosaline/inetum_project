import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { HttpProviderService } from '../../services/http-provider.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [EventCardComponent, SpinnerComponent, CommonModule],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent implements OnInit {
  eventsList: any[] = [];
  loading: boolean = true;
  constructor(private httpProviderService: HttpProviderService) {}
  ngOnInit(): void {
    this.loadCompartiments();
  }

  loadCompartiments() {
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
