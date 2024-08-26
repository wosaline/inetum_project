import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpProviderService } from '../../services/http-provider.service';
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
  isEditing = false;
  currentEventId?: number;
  minDate: string = "";
  timeOptions: string[] = [];

  errorMessage: string | null = null;
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private router: Router, private httpProviderService: HttpProviderService) {}

  ngOnInit(): void {
    this.loadEvents();
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['09:30', Validators.required],
      location: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      private: [false]
    });
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

  loadEvents(): void {
    this.httpProviderService.getAllEvents().subscribe(
      (res) => {
        this.events = res.body || [];
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );

    console.log(this.events);
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const event: Event = this.eventForm.value;
      console.log(event)
      event.createdBy=1;
      if (this.isEditing) {
        event.id = this.currentEventId;
        this.httpProviderService.putEvent(event).subscribe(() => {
          // this.loadEvents();
        });
      } else {
        console.log(event);
        this.httpProviderService.postEvent(event).subscribe(() => {
          // this.loadEvents();
        });
      }
      this.reset();
    }
  }

  editEvent(event: Event): void {
    this.isEditing = true;
    this.currentEventId = event.id;
    this.eventForm.patchValue(event);
    console.log(event);
  }

  deleteEvent(eventId?: number): void {
    if (eventId) {
      this.httpProviderService.deleteEvent(eventId).subscribe(() => this.loadEvents());
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
}
