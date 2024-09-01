import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Event } from '../../../interfaces/event';

@Component({
  selector: 'edit-event-modal',
  templateUrl: './edit-event-modal.component.html',
  styleUrls: ['./edit-event-modal.component.scss'],
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  standalone: true,
})
export class EditEventModalComponent implements OnInit {
  editEventForm!: FormGroup;
  minDate: string = '';
  timeOptions: string[] = [];
  eventData: Event;

  constructor(
    private dialogRef: MatDialogRef<EditEventModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { event: Event; onConfirm: (event: Event) => void }
  ) {
    this.eventData = data.event;
  }

  ngOnInit() {
    console.log('eventData', this.eventData);
    // Initialiser le formulaire avec les valeurs actuelles de l'événement
    this.editEventForm = this.fb.group({
      title: [this.eventData.title, Validators.required],
      description: [this.eventData.description, Validators.required],
      date: [this.eventData.date, Validators.required],
      time: [this.formatTime(this.eventData.time), Validators.required],
      location: [this.eventData.location, Validators.required],
      capacity: [
        this.eventData.capacity,
        [Validators.required, Validators.min(1)],
      ],
      private: [this.eventData.private],
    });

    // Définir la date minimale à aujourd'hui
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.generateTimeOptions();
  }

  generateTimeOptions(): void {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    this.timeOptions = times;
  }

  onSubmit(): void {
    if (this.editEventForm.valid) {
      const updatedEvent: Event = {
        ...this.eventData,
        ...this.editEventForm.value,
      };

      // Appeler la fonction de confirmation avec l'événement mis à jour
      this.data.onConfirm(updatedEvent);
      this.dialogRef.close();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }
}
