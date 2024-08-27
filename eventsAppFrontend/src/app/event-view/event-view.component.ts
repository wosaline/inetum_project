import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../interfaces/event';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule
  ],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.css'
})
export class EventViewComponent implements OnInit{
  @Input() event!: Event;
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
