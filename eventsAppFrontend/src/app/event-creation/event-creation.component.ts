import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-event-creation',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './event-creation.component.html',
  styleUrl: './event-creation.component.css'
})
export class EventCreationComponent {

}
