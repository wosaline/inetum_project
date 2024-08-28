import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Event } from '../../interfaces/event';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpProviderService } from '../../services/http-provider.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { ParticipantsListComponent } from '../participants-list/participants-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SpinnerComponent,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    CommentCardComponent,
    ParticipantsListComponent,
  ],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.css'
})
export class EventViewComponent implements OnInit{
  event: Event | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);



  constructor(private router: Router, private httpProviderService: HttpProviderService) {}

  ngOnInit(): void {
    console.log(this.route.snapshot);
    const eventId = parseInt(this.route.snapshot.params['eventId'], 10);
    const userId = parseInt(this.route.snapshot.params['userId'], 10);
    this.httpProviderService.getEventById(eventId).subscribe(
      (res)=>{
        this.event = res.body || undefined;
        console.log(this.event);
    });

  }
}
