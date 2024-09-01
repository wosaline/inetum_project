package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.Participant;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface EventService {
    List<Event> getAllEvents();
    Event getEventById(int eventId);
    Event addEvent(Event event);
    Event updateEvent(int eventId, Event event);
    void deleteEvent(int eventId);
    Participant inviteUsersToEvent(int eventId, int userId, int creatorId);
    Participant updateParticipant(int participantId, int eventId, int userId, String reponse);
    List<Event> getAllUserEventsByDate(LocalDate date,int userId);
    List<Event> getAllEventsByMonth(int year, int month);
    List<LocalDate> getDatesWithUserEvents(int year, int month,int userId);
    List<LocalDate> getDatesWithEvents(int year, int month);
    List<Participant> getAllParticipantsByEventId(int eventId);
    List<Participant> getAllParticipantsByEventIdAndStatusInvitedAndAccepted(int eventId);
    List<Participant> getPendingInvitations(int userId);
    List<LocalDate> getAllDatesWithUserEvents(int userId);
    List<Event> getAllPublicEvents();
    Participant getParticipantByUserId(int userId, int eventId);
}