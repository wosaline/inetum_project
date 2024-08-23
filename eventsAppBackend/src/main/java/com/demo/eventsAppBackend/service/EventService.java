package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;

import java.util.List;

public interface EventService {
    List<Event> getAllEvents();
    Event getEventById(int eventId);
    List<Event> getAllEventsByUserId(int userId);
    Event addEvent(Event event);
    void deleteEvent(int eventId);
}