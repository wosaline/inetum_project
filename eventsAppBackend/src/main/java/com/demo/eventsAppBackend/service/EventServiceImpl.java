package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.Participant;
import com.demo.eventsAppBackend.model.ParticipantStatus;
import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.repository.EventRepository;
import com.demo.eventsAppBackend.repository.ParticipantRepository;
import com.demo.eventsAppBackend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;

    public EventServiceImpl(EventRepository eventRepository, UserRepository userRepository, ParticipantRepository participantRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.participantRepository = participantRepository;
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
        User user = userRepository.findById(event.getCreatedBy().getUserId());
        if (user != null) {
            event.setCreatedBy(user);
            Event savedEvent = eventRepository.save(event);

            // create participant : save the event's organiser as participant
            Participant participant = new Participant();
            participant.setUser(user);
            participant.setEvent(savedEvent);
            participant.setStatus(ParticipantStatus.ACCEPTED);

            participantRepository.save(participant);

            return savedEvent;
        } else {
            throw new EntityNotFoundException("Créateur de l'événement non trouvé");
        }
    }

    @Override
    public Event updateEvent(int eventId, Event event) {
        User user = userRepository.findById(event.getCreatedBy().getUserId());
        Event eventToUpdate = eventRepository.findById(eventId);
        if (user != null || eventToUpdate != null) {
            event.setEventId(eventId);
            event.setCreatedBy(user);
            event.setCreatedAt(eventToUpdate.getCreatedAt());
            return eventRepository.save(event);
        } else {
            throw new EntityNotFoundException("Créateur de l'événement et/ou événement non trouvé");
        }
    }
}
