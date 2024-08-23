package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService{

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Event getEventById(int eventId) {
        return eventRepository.findById(eventId);
    }

    @Override
    public List<Event> getAllEventsByUserId(int userId) {
        return eventRepository.findAllByCreatedByUserId(userId);
    }

    @Override
    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }
}
