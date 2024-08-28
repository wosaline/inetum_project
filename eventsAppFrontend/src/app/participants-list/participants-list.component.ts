import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-participants-list',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
  ],
  templateUrl: './participants-list.component.html',
  styleUrl: './participants-list.component.css'
})
export class ParticipantsListComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
