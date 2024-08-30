import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatCalendarCellClassFunction,
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpProviderService } from '../../services/http-provider.service';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { AvatarComponent } from '../avatar/avatar.component';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuTrigger,
    MatMenu,
    AvatarComponent,
    RouterModule,
    CommonModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [DatePipe, provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  selectedYear = new Date().getFullYear(); //initialiser par l'année en cours
  selectedMonth = new Date().getMonth() + 1; //initialiser par le mois courant
  user!: User;
  displayDashboard: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    const userString = localStorage.getItem('eventAppUser');
    if (userString) {
      const userObject = JSON.parse(userString);
      this.user = userObject as User;
    }

    this.isLoggedIn = this.authService.isAuthenticated();
    this.user?.id && this.loadMarkedDates();
    this.displayDashboard = this.authService.isAdmin() ? true : false;
  }
  handleDashboardClick(): void {
    this.router.navigate(['/admin/users']);
  }
  handleClick(): void {
    this.authService.logout();
    this.isLoggedIn = this.authService.isAuthenticated();
    this.router.navigate(['/home']);
  }
  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = new Date(event.value ?? '');
    // this.selectedMonth = selectedDate.getFullYear();
    // this.selectedMonth = selectedDate.getMonth() + 1;

    if (selectedDate) {
      const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd');

      if (formattedDate) {
        this.router.navigate([`/calendar/${formattedDate}`]);
      }
    }
  }

  loadMarkedDates() {
    this.httpProviderService
      .getMarkedDates(
        this.selectedYear,
        this.selectedMonth,
        Number(this.user?.id)
      )
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
