import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

import { AvatarComponent } from '../../avatar/avatar.component';
import { ModalComponent } from '../../modal/modal.component';
import { HttpProviderService } from '../../../services/http-provider.service';
import { Event } from '../../../interfaces/event';
import { EditEventModalComponent } from '../edit-event-modal/edit-event-modal.component';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-events-management',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    AvatarComponent,
    MatButtonModule,
    ModalComponent,
  ],
  templateUrl: './events-management.component.html',
  styleUrl: './events-management.component.css',
})
export class EventsManagementComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  eventsList: Event[] = [];
  loading: boolean = true;
  selectedEvent: any;
  dialogTitle: string = 'Confirmez vous la suppression ?';
  dialogSubtitle: string =
    'Si vous confirmez, cet événement sera supprimé définitivement';

  constructor(
    private httpProviderService: HttpProviderService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadEvents();
  }
  loadEvents() {
    this.httpProviderService.getAllEvents().subscribe(
      (res) => {
        this.eventsList = res.body || [];
        console.log('events:', this.eventsList);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching events:', error);
        this.loading = false;
      }
    );
  }

  openDeleteDialog(): void {
    this.dialog.open(ModalComponent, {
      width: 'auto',
      data: {
        dialogTitle: this.dialogTitle,
        dialogSubtitle: this.dialogSubtitle,
        onConfirm: this.onConfirm,
      },
    });
  }

  onConfirm(): void {
    console.log('hi');
  }

  openEditEventDialog(event: object): void {
    const dialogRef = this.dialog.open(EditEventModalComponent, {
      width: '600px', // Taille du modal
      data: {
        event: event, // Passer l'événement à modifier
        onConfirm: (updatedEvent: Event) => {
          console.log('updatedEvent', updatedEvent);
          let { id, title, description, date, time, capacity, location } =
            updatedEvent;

          this.httpProviderService
            .putEvent({
              id,
              createdBy: updatedEvent.createdBy,
              title,
              description,
              date,
              time,
              capacity,
              private: updatedEvent.private,
              location,
            })
            .subscribe(() => {
              this.loadEvents(); // Recharger la liste des événements après la modification
            });
        },
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      // this.cancelEdit();
    });
  }
}
