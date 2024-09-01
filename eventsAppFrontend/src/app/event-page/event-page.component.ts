import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpProviderService } from '../../services/http-provider.service';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../interfaces/event';
import { User } from '../../interfaces/user';
import { Participant } from '../../interfaces/participant';
import { CustomAlertComponent } from '../../app/custom-alert/custom-alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule,
    CustomAlertComponent,
  ],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css',
})
export class EventPageComponent implements OnInit {
  eventForm!: FormGroup;
  events: Event[] = [];
  users: User[] = []; // list of users to invite
  userId: number | undefined;
  isEditing = false;
  currentEventId?: number;
  minDate: string = '';
  timeOptions: string[] = [];
  showEventForm = false; // display of the Eventform
  showUserList = false; // display of the UserListForm
  selectedEvent?: Event;

  errorMessage: string | null = null;
  selectedImage: File | null = null;

  alertMessages: string[] = []; // Message to show in the alert

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private httpProviderService: HttpProviderService
  ) {}

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  ngOnInit(): void {
    // get the connected user
    const user = JSON.parse(localStorage.getItem('eventAppUser') || '{}');
    this.userId = user.id;

    if (this.userId) {
      console.log('User ID:', this.userId);
      // Load all events for the connected user
      this.httpProviderService
        .getAllEventsByUserId(this.userId)
        .subscribe((response) => {
          this.events = response.body || [];
        });

      this.httpProviderService.getPendingInvitations(this.userId).subscribe(
        (response) => {
          const invitations = response.body;
          if (Array.isArray(invitations)) {
            this.handleInvitations(invitations);
          } else {
            console.error("La réponse n'est pas un tableau:", invitations);
          }
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des invitations:',
            error
          );
        }
      );
    }

    // Initialize the event form
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['09:30', Validators.required],
      location: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      private: [false],
    });
    // Set the minimum date to today and generate time options for the event date picker
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.generateTimeOptions();

    // Load all users
    this.loadUsers();
  }

  generateTimeOptions(): void {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    this.timeOptions = times;
  }

  loadUserEvents(): void {
    this.httpProviderService.getAllEventsByUserId(this.userId!).subscribe(
      (res) => {
        this.events = res.body || [];
      },
      (error) => {
        console.error('Error fetching user-specific events:', error);
      }
    );
  }

  loadUsers(): void {
    this.httpProviderService.getAllUsers().subscribe(
      (res) => {
        this.users = res.body || [];
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const event: Event = this.eventForm.value;
      // TODO ONCE LOGGING IS ON
      event.createdBy = this.userId!;
      if (this.isEditing) {
        event.id = this.currentEventId;
        this.httpProviderService.putEvent(event).subscribe(() => {
          this.loadUserEvents();
        });
      } else {
        this.httpProviderService.postEvent(event).subscribe(() => {
          this.loadUserEvents();
        });
      }
      this.reset();
    }
  }

  editEvent(event: Event): void {
    event.time = this.formatTime(event.time);
    this.isEditing = true;
    this.currentEventId = event.id;
    this.showEventForm = true;
    this.eventForm.patchValue(event);
  }

  deleteEvent(eventId?: number): void {
    if (eventId) {
      this.httpProviderService
        .deleteEvent(eventId)
        .subscribe(() => this.loadUserEvents());
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentEventId = undefined;
    this.eventForm.reset({
      time: '09:30', // Réinitialiser l'heure par défaut
      private: false,
    });
  }

  reset(): void {
    // this.isEditing = false;
    // this.currentEventId = undefined;
    window.location.reload();
    // this.eventForm.reset();
  }

  toggleEventForm(): void {
    this.showEventForm = !this.showEventForm; // Alternate display of EventForm
  }

  toggleUserList(event?: Event): void {
    if (event) {
      this.selectedEvent = event; // Définir l'événement sélectionné si défini
      this.showUserList = !this.showUserList; // // Alternate
    } else {
      this.showUserList = false; // Si aucun événement, masquer la liste des utilisateurs
    }
  }

  canEdit(event: Event): boolean {
    // Vérifier si event.createdBy est un objet ou un ID
    if (typeof event.createdBy === 'number') {
      return this.userId === event.createdBy;
    } else {
      return this.userId === event.createdBy.id;
    }
  }

  canDelete(event: Event): boolean {
    // Vérifier si event.createdBy est un objet ou un ID
    if (typeof event.createdBy === 'number') {
      return this.userId === event.createdBy;
    } else {
      return this.userId === event.createdBy.id;
    }
  }

  canInviteUser(event?: Event): boolean {
    if (!event || !this.userId) {
      return false;
    }
    return this.userId === (event.createdBy as User).id;
  }

  inviteUser(userId: number): void {
    if (this.selectedEvent && this.selectedEvent.id && this.userId) {
      this.httpProviderService
        .inviteUsersToEvent(this.selectedEvent.id, userId, this.userId)
        .subscribe(
          (response) => {
            console.log('User invited:', response);
            this.toggleUserList(this.selectedEvent); // Réafficher la liste des utilisateurs après l'invitation
          },
          (error) => {
            console.error('Error inviting user:', error);
          }
        );
    } else {
      console.error('Selected event or user ID is undefined.');
    }
  }

  getFilteredUsers(): User[] {
    if (!this.selectedEvent) {
      return this.users;
    }
    const creatorId =
      typeof this.selectedEvent.createdBy === 'number'
        ? this.selectedEvent.createdBy
        : this.selectedEvent.createdBy.id;
    return this.users.filter((user) => user.id !== creatorId);
  }

  showAlert(message: string): void {
    this.alertMessages.push(message);
  }

  // Remplacez alert() par showAlert()
  private handleInvitations(invitations: any[]): void {
    invitations.forEach((invitation) => {
      const creator = invitation.event.createdBy;
      const creatorName =
        typeof creator !== 'number' ? creator.username : 'Unknown';
      this.showAlert(
        `${creatorName} vous a invité à l'évènement "${invitation.event.title}"`
      );
    });
  }

  handleInvitation(): void {
    if (this.userId) {
      this.httpProviderService.getPendingInvitations(this.userId).subscribe(
        (response) => {
          const invitations = response.body;
          if (Array.isArray(invitations)) {
            this.handleInvitations(invitations);
          } else {
            console.error("La réponse n'est pas un tableau:", invitations);
          }
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des invitations:',
            error
          );
        }
      );
    } else {
      console.error('User ID is undefined.');
    }
  }
}
