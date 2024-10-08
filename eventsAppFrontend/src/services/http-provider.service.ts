import { Injectable } from '@angular/core';
import { WebAPIService } from './web-api.service';
import { User } from '../interfaces/user';
import { Event } from '../interfaces/event';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InviteResponse } from '../interfaces/participant';
import { CommentToClient } from '../interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  private baseUrl = 'http://localhost:8080';
  private httpLinks = {
    mappingEvents: this.baseUrl + '/events',
    mappingUsers: this.baseUrl + '/users',
    mappingComments: this.baseUrl + '/comments',
    mappingMarkedDates: this.baseUrl + `/events/dates`,
    mappingUserEventsByDate: this.baseUrl + `/events/date`,
  };

  constructor(private webApiService: WebAPIService) {}

  getAllEvents() {
    return this.webApiService.get(this.httpLinks.mappingEvents);
  }
  getAllPublicEvents(){
    return this.webApiService.get(this.httpLinks.mappingEvents+'/public');
  }
  getAllUsers() {
    return this.webApiService.get(this.httpLinks.mappingUsers);
  }
  getAllComments() {
    return this.webApiService.get(this.httpLinks.mappingComments);
  }
  getMarkedDates(year: number, month: number, userId: number) {
    let formattedMonth = month < 10 ? `0${month}` : month;
    return this.webApiService.get(
      this.httpLinks.mappingMarkedDates +
        `/${year}/${formattedMonth}/user/${userId}`
    );
  }

  getAllMarkedDates(userId: number) {
    return this.webApiService.get(
      this.httpLinks.mappingMarkedDates + `/user/${userId}`
    );
  }

  getEventsByDateAndUserId(date: string, userId: number) {
    return this.webApiService.get(
      this.httpLinks.mappingUserEventsByDate + `/${date}/user/${userId}`
    );
  }

  getEventById(id: number) {
    return this.webApiService.get(this.httpLinks.mappingEvents + `/${id}`);
  }

  postEvent(event: Event) {
    return this.webApiService.post(this.httpLinks.mappingEvents, event, true);
  }

  putEvent(event: any) {
    let { createdBy, title, description, date, time, capacity, location } =
      event;
    return this.webApiService.put(
      this.httpLinks.mappingEvents + `/${event.id}`,
      {
        createdBy: createdBy.id ?? createdBy,
        title,
        description,
        date,
        time,
        capacity,
        private: event.private,
        location,
      },
      true
    );
  }

  deleteEvent(id: number) {
    return this.webApiService.delete(this.httpLinks.mappingEvents + `/${id}`);
  }
  deleteComment(id: number) {
    return this.webApiService.delete(this.baseUrl + `/comment/${id}`);
  }

  createUser(user: User) {
    return this.webApiService.post(this.httpLinks.mappingUsers, user, false);
  }
  deleteUser(id: number) {
    return this.webApiService.delete(this.httpLinks.mappingUsers + `/${id}`);
  }

  putUser(user: User) {
    return this.webApiService.put(
      this.httpLinks.mappingUsers + `/${user.id}`,
      user,
      false
    );
  }

  getAllEventsByUserId(userId: number) {
    return this.webApiService.get(
      this.httpLinks.mappingUsers + `/${userId}/events`
    );
  }

  inviteUsersToEvent(
    eventId: number,
    userId: number,
    creatorId: number
  ): Observable<any> {
    const url = `${this.httpLinks.mappingEvents}/${eventId}/invite`;
    const body = { userId, creatorId }; // Corps de la requête
    return this.webApiService.post(url, body, true); // Utilise le booléen pour indiquer que body contient des paramètres de requête
  }

  // Récupérer les invitations pour un utilisateur
  getPendingInvitations(userId: number) {
    return this.webApiService.get(
      this.httpLinks.mappingEvents + `/users/${userId}/invitations`
    );
  }

  getAllCommentsByEventId(id: number) {
    return this.webApiService.get(this.httpLinks.mappingComments + `/${id}`);
  }

  getRatingByEventIt(id: number) {
    return this.webApiService.get(
      this.httpLinks.mappingComments + `/rating/${id}`
    );
  }

  createComment(comment: CommentToClient) {
    return this.webApiService.post(
      this.httpLinks.mappingComments,
      comment,
      true
    );
  }

  getParticipantsByEventId(id: number) {
    console.log('get participants for event ' + id);
    return this.webApiService.get(
      this.httpLinks.mappingEvents + `/${id}/participants`
    );
  }

  getParticipantsByEventIdAndStatusInvitedAndAccepted(id: number) {
    return this.webApiService.get(
      this.httpLinks.mappingEvents + `/${id}/participants/supposedly`
    );
  }

  // PathVariable int eventId,
  //           @PathVariable int participantId,
  //           @RequestParam("userId") int userId,
  //           @RequestParam("response") String response)
  // ("events/{eventId}/invite/{participantId}")
  updateInvite(eventId: number, participantId: number, obj: InviteResponse) {
    return this.webApiService.put(
      this.httpLinks.mappingEvents + `/${eventId}/invite/${participantId}`,
      obj,
      true
    );
  }
}
