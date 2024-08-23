package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
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

    @Override
    public void deleteEvent(int eventId) {
        Event event = eventRepository.findById(eventId);
        if (event != null) {
            eventRepository.delete(event);
        } else {
            throw new EntityNotFoundException("Evénement à supprimer non trouvé");
        }
    }
}
