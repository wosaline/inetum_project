import { Component, Input, OnInit } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { HttpProviderService } from '../../services/http-provider.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [EventCardComponent, SpinnerComponent, CommonModule],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent {
  @Input() eventsList: any[] = [];
  @Input() loading: boolean = true;
}
