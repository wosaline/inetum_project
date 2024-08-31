import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { InviteResponse, Participant } from '../../interfaces/participant';
import { HttpProviderService } from '../../services/http-provider.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-participants-list',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatIcon
  ],
  templateUrl: './participants-list.component.html',
  styleUrl: './participants-list.component.css'
})
export class ParticipantsListComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  userId: number = 0;
  participantsList: Participant[] = [];
  isUserEventCreator: boolean = false;
  // Participant can respond only if the status is == invited
  // Creator can only cancel an invite if it is != canceled

  constructor(private httpProviderService: HttpProviderService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot);
    const eventId = parseInt(this.route.snapshot.params['eventId'], 10);
    this.userId = parseInt(this.route.snapshot.params['userId'], 10);
    this.loadParticipants(eventId);
  }

  loadParticipants(eventId: number) {
    this.httpProviderService.getParticipantsByEventId(eventId).subscribe(
      (res) => {
        console.log(res.body);
        this.participantsList = res.body || [];
        console.log('Participants:', this.participantsList);
        if (this.participantsList[0]) {
          if (this.participantsList[0].user?.id == this.userId) {
            this.isUserEventCreator = true;
          }
        }
      },
      (error) => {
        console.log(error.status);
        console.error('Error fetching participants:', error);
      }
    );
  }

  // PathVariable int eventId,
  //           @PathVariable int participantId,
  //           @RequestParam("userId") int userId,
  //           @RequestParam("response") String response)
  respondToInvite(participant: Participant, participantResponse: string): void {


    const inviteResponse: InviteResponse = {
      userId: this.userId,
      response: participantResponse
    }

    let i = this.participantsList.findIndex(p => p.id === participant.id)
    this.participantsList[i] = participant;

    if (participant.event?.id && participant.id) {
      let eventId: number = participant.event.id;
      this.httpProviderService.updateInvite(eventId, participant.id, inviteResponse).subscribe(
        (res) => {
          let updatedParticipant: Participant = res;
          let i = this.participantsList.findIndex(p => p.id === updatedParticipant.id)
          this.participantsList[i] = updatedParticipant;
        },
        (error) => {
          console.error('Error updating invite:', error);
        }
      );
    }
  }
}
