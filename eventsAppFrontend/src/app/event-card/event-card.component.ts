import { Component, Input } from '@angular/core';
import { getRandomImage } from '../utils';

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

  constructor() {
    this.randomImage = getRandomImage();
  }
  // Méthode pour formater l'heure en HH:MM
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }
}
