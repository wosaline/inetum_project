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
    private datePipe: DatePipe
  ) {}
  isLoggedIn = false;
  readonly startDate: Date = new Date();

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
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
}
