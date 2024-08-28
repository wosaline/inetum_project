import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { Comment } from '../../interfaces/comment';

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
  isEventPassed: boolean = false;
  commentsList: Comment[]=[];

  constructor(private router: Router, private httpProviderService: HttpProviderService) {}

  ngOnInit(): void {
    
    console.log(this.route.snapshot);
    const eventId = parseInt(this.route.snapshot.params['eventId'], 10);
    const userId = parseInt(this.route.snapshot.params['userId'], 10);
    this.httpProviderService.getEventById(eventId).subscribe(
      (res)=>{
        this.event = res.body || undefined;
        this.eventHappened();
        this.loadComments();
        console.log(this.event);
    });
    
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  eventHappened(): void{
    const now = new Date();
    if(this.event){
      const eventDateTime = new Date(`${this.event.date}T${this.event.time}`);
      this.isEventPassed = eventDateTime < now;
    }
  }

  loadComments(){
    console.log(this.event?.id);
    console.log(this.event);
    if(this.event && this.event.id){
      this.httpProviderService.getAllCommentsByEventId(this.event.id).subscribe(
        (res) => {
          this.commentsList = res.body || [];
          console.log('Comments:', this.commentsList);
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    }
  }
}
