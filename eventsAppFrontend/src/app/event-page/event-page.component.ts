import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpProviderService } from '../../services/http-provider.service';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent implements OnInit {
  eventForm!: FormGroup;
  events: Event[] = [];
  isEditing = false;
  currentEventId?: number;

  constructor(private fb: FormBuilder, private httpProviderService: HttpProviderService) {}

  ngOnInit(): void {
    this.loadEvents();
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  loadEvents(): void {
    this.httpProviderService.getAllEvents().subscribe(events => this.events = events);
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const event: Event = this.eventForm.value;

      if (this.isEditing) {
        event.id = this.currentEventId;
        this.httpProviderService.putEvent(event).subscribe(() => {
          this.loadEvents();
          this.resetForm();
        });
      } else {
        this.httpProviderService.postEvent(event).subscribe(() => {
          this.loadEvents();
          this.resetForm();
        });
      }
    }
  }

  editEvent(event: Event): void {
    this.isEditing = true;
    this.currentEventId = event.id;
    this.eventForm.patchValue(event);
  }

  deleteEvent(eventId?: number): void {
    if (eventId) {
      this.httpProviderService.deleteEvent(eventId).subscribe(() => this.loadEvents());
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentEventId = undefined;
    this.eventForm.reset();
  }
}
