import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpProviderService } from '../../services/http-provider.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [DatePipe],
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe,
    private httpProviderService: HttpProviderService
  ) {}
  isLoggedIn = false;
  readonly startDate: Date = new Date();
  markedDates = [];
  selectedYear = 2024;
  selectedMonth = 8;

  user = JSON.parse(localStorage.getItem('eventAppUser') ?? '{}');

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.user?.id && this.loadMarkedDates();
    console.log('user', this.user.id);
  }
  handleClick(): void {
    this.authService.logout();
    this.isLoggedIn = this.authService.isAuthenticated();
  }
  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;

    if (selectedDate) {
      const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');

      if (formattedDate) {
        this.router.navigate([`/calendar/${formattedDate}`]);
      }
    }
  }

  loadMarkedDates() {
    this.httpProviderService
      .getMarkedDates(this.selectedYear, this.selectedMonth, this.user?.id)
      .subscribe(
        (res) => {
          this.markedDates = res.body || [];
          console.log('markedDates:', this.markedDates);
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
  }
}
