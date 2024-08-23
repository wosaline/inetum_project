package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.repository.EventRepository;
import org.springframework.stereotype.Service;

@Service
public class EventServiceImpl implements EventService{

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    @Override
    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }
}
