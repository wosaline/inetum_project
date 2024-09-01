import { Component, inject, Input } from '@angular/core';
import { getRandomImage } from '../utils';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
})
export class EventCardComponent {
  @Input() event: any;
  randomImage: string = '';

  readonly errorDialog = inject(MatDialog);

  constructor(private router: Router, private authService: AuthService,) {
    this.randomImage = getRandomImage();
  }
  // Méthode pour formater l'heure en HH:MM
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  navigateToEvent(): void {
    if(this.authService.isAuthenticated()){
      let user: User;
      const userString = localStorage.getItem('eventAppUser');
      if (userString) {
        const userObject = JSON.parse(userString);
        user = userObject as User;
        this.router.navigate([`/event/${this.event.id}/user/${user.id}`]);
      }else{
        console.error("User not found?");
      }
    }else{
      this.errorDialog.open(ErrorDialogComponent, {
        data:{errorMessage:"Si vous souhaitez consulter les événements, veuillez vous connecter.", errorTitle: "Psst... C'est privé !"}
      });
    }
  }
}
