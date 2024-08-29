import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from '../../services/http-provider.service';
import { EventsListComponent } from '../events-list/events-list.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [NavbarComponent, EventsListComponent, CommonModule],
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent implements OnInit, OnDestroy {
  userEventsList: any[] = [];
  loading: boolean = false;
  selectedDate: string = '';
  private routeSub: Subscription = new Subscription();
  user!: User;

  constructor(
    private httpProviderService: HttpProviderService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('eventAppUser');
      if (userString) {
        const userObject = JSON.parse(userString);
        this.user = userObject as User;
      }
    // Subscribe to route parameter changes
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      const date = params['date'];
      if (date !== this.selectedDate) {
        this.selectedDate = date;
        this.loadUserEvents();
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from route parameters to avoid memory leaks
    this.routeSub.unsubscribe();
  }

  private loadUserEvents(): void {
    if (this.selectedDate && this.user.id) {
      this.loading = true;
      this.httpProviderService
        .getEventsByDateAndUserId(this.selectedDate, this.user.id)
        .subscribe({
          next: (res) => {
            this.userEventsList = res.body || [];
            console.log('Events***:', this.userEventsList);
            this.loading = false;
          },
          error: (error) => {
            console.error('Error fetching events:', error);
            this.loading = false;
          },
        });
    }
  }
}
