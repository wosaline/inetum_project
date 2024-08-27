import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpProviderService } from '../../services/http-provider.service';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../interfaces/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css',
})
export class EventPageComponent implements OnInit {

  eventForm!: FormGroup;
  events: Event[] = [];
  userId: number | undefined;
  isEditing = false;
  currentEventId?: number;
  minDate: string = "";
  timeOptions: string[] = [];
  showEventForm = false; // to handdle the display of the form

  errorMessage: string | null = null;
  selectedImage: File | null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder, 
    private router: Router, 
    private httpProviderService: HttpProviderService) {}

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }
  
  ngOnInit(): void {
    // get the connected user
    const user = JSON.parse(localStorage.getItem('eventAppUser') || '{}');
    this.userId = user.id;

    if (this.userId) {
      this.httpProviderService.getAllEventsByUserId(this.userId).subscribe((response) => {
        this.events = response.body || [];
      });
    }

    // Initialize the event form
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['09:30', Validators.required],
      location: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      private: [false]
    });
    // Set the minimum date to today and generate time options for the event date picker
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.generateTimeOptions();
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
    this.eventForm.patchValue(event);
  }

  deleteEvent(eventId?: number): void {
    if (eventId) {
      this.httpProviderService.deleteEvent(eventId).subscribe(() => this.loadUserEvents());
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentEventId = undefined;
    this.eventForm.reset({
      time: '09:30',  // Réinitialiser l'heure par défaut
      private: false
    });
  }

  reset(): void {
    // this.isEditing = false;
    // this.currentEventId = undefined;
    window.location.reload();
  }

  toggleEventForm(): void {
    this.showEventForm = !this.showEventForm;  // Alterner l'affichage du formulaire
  }

}
