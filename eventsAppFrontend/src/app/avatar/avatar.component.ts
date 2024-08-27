import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent implements OnInit {
  @Input() user!: User;

  initials: string = "";
  circleColor: string = "";

  private colors = [
    "#264653","#2a9d8f", "#e9c46a", "#f4a261","#e76f51"
  ];

  ngOnInit() {
    this.createInititals();

    const randomIndex = Math.floor(
      Math.random() * Math.floor(this.colors.length)
    );
    this.circleColor = this.colors[randomIndex];

  }

  private createInititals(): void {
    this.initials+=this.user.lastName.charAt(0).toUpperCase();
    this.initials+=this.user.firstName.charAt(0).toUpperCase();
    console.log(this.initials);
  }
}
