import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { Participant } from '../../interfaces/participant';
import { HttpProviderService } from '../../services/http-provider.service';

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
export class ParticipantsListComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  userId: number=0;
  participantsList: Participant[]=[];
  isUserEventCreator: boolean=false;

  constructor(private httpProviderService: HttpProviderService) {}

  ngOnInit(): void {
    console.log(this.route.snapshot);
    const eventId = parseInt(this.route.snapshot.params['eventId'], 10);
    this.userId = parseInt(this.route.snapshot.params['userId'], 10);
    this.loadParticipants(eventId);
  }

  loadParticipants(eventId:number){
    this.httpProviderService.getParticipantsByEventId(eventId).subscribe(
      (res) => {
        console.log(res.body);
        this.participantsList = res.body || [];
        console.log('Participants:', this.participantsList);
        if(this.participantsList[0]){
          if(this.participantsList[0].user?.id==this.userId){
            this.isUserEventCreator=true;
          }
        }
      },
      (error) => {
        console.log(error.status);
        console.error('Error fetching participants:', error);
      }
    );
  }

}
