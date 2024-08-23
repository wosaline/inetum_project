package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.repository.EventRepository;
import com.demo.eventsAppBackend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventServiceImpl(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Event getEventById(int eventId) {
        Event event = eventRepository.findById(eventId);
        if (event != null) {
            return event;
        } else {
            throw new EntityNotFoundException("Evénement non trouvé");
        }
    }

    @Override
    public Event addEvent(Event event) {
        User user = userRepository.findById(event.getCreatedBy().getId());
        if (user != null) {
            event.setCreatedBy(user);
            return eventRepository.save(event);
        } else {
            throw new EntityNotFoundException("Créateur de l'événement non trouvé");
        }
    }

    @Override
    public Event updateEvent(int eventId, Event event) {
        User user = userRepository.findById(event.getCreatedBy().getId());
        Event eventToUpdate = eventRepository.findById(eventId);
        if (user != null || eventToUpdate != null) {
            event.setId(eventId);
            event.setCreatedBy(user);
            event.setCreatedAt(eventToUpdate.getCreatedAt());
            return eventRepository.save(event);
        } else {
            throw new EntityNotFoundException("Créateur de l'événement et/ou événement non trouvé");
        }
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
