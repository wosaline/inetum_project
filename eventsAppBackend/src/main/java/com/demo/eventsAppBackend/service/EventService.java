package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.Participant;

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
    List<Event> getAllEventsByDate(LocalDate date);
    List<Event> getAllEventsByMonth(int year, int month);
    List<LocalDate> getDatesWithEvents(int year, int month);
}